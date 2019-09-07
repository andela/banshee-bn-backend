/* eslint-disable no-unused-expressions */
import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import app from '../src/index';
import jwtHelper from '../src/helpers/Token';
import users from './mockData/mockAuth';
import models from '../src/database/models';
import mockTripRequests from './mockData/mockTrips';

chai.use(chaiHttp);
const { Trip } = models;
const {
  oneWayTravelRequests: oneWay,
  returnTravelRequests: returnTrip
} = mockTripRequests;
const tripId = 'ffe25dbe-29ea-4759-8461-ed116f6739df';
const invalidtripId = 'ffe25dbe-29ea-4759-8461-ed116f6740df';
const { expect } = chai;
const {
  completeLoginWithCode,
  credentials,
  adminAuth,
  staffAuth
} = users;
let validUserToken;

const baseURL = '/api/v1/trips';

describe('Travel Request', () => {
  describe('Get Users Requests and details', () => {
    it('Should return a users requests', (done) => {
      const token = jwtHelper.generateToken(completeLoginWithCode);

      chai.request(app).get(`${baseURL}/user`).send({ token }).end((err, res) => {
        expect(res.status).to.eq(200);
        expect(res.body.message).to.eq('User requests successfully retrieved');
        expect(res.body.data[0].userId).to.eq(completeLoginWithCode.id);
        expect(res.body.data[0].stop).to.be.an('Array');
        done();
      });
    });

    it('should return error if userid is not supplied', (done) => {
      const token = jwtHelper.generateToken(credentials);

      chai.request(app).get(`${baseURL}/user`).send({ token }).end((err, res) => {
        expect(res.status).to.eq(500);
        expect(res.body.success).to.be.false;
        done();
      });
    });

    it('should return error if user is not authenticated', (done) => {
      chai.request(app).get(`${baseURL}/user`).end((err, res) => {
        expect(res.status).to.eq(401);
        expect(res.body.success).to.be.false;
        expect(res.body.message).to.eq('Unathorized, You did not provide a token');
        done();
      });
    });
  });
});

describe('Create travel request test', () => {
  before((done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(credentials)
      .end((err, res) => {
        const { token } = res.body.data.user;
        validUserToken = token;
        done();
      });
  });
  describe('Create one way travel request', () => {
    it('should create a one-way travel request', (done) => {
      chai.request(app)
        .post(baseURL)
        .send(oneWay[0])
        .set('authorization', validUserToken)
        .end((err, res) => {
          const { trip } = res.body.data;
          expect(res.status).to.equal(201);
          expect(res.body.data).to.haveOwnProperty('trip');
          expect(trip.type).to.eql(oneWay[0].type);
          expect(trip.startBranchId).to.eql(oneWay[0].from);
          expect(trip.reason).to.eql(oneWay[0].reason);
          expect(new Date(trip.tripDate)).to.eql(new Date(oneWay[0].departureDate));
          expect(trip.stop[0].destinationBranchId).to.eql(oneWay[0].destination.to);
          expect(trip.stop[0].accomodationId).to.eql(oneWay[0].destination.accomodation);
          done();
        });
    });
    it('should return an error when trip type is invalid', (done) => {
      chai.request(app)
        .post(baseURL)
        .send(oneWay[1])
        .set('authorization', validUserToken)
        .end((err, res) => {
          expect(res.status).to.eql(400);
          expect(res.body.message).to.eql('Validation Error!');
          expect(res.body.data.type).to.eql('Invalid trip type');
          done();
        });
    });
    it('should return an error when passed invalid start branch', (done) => {
      chai.request(app)
        .post(baseURL)
        .send(oneWay[2])
        .set('authorization', validUserToken)
        .end((err, res) => {
          expect(res.status).to.eql(400);
          expect(res.body.message).to.eql('Validation Error!');
          expect(res.body.data.from).to.eql(
            'Start branch location does not exist'
          );
          done();
        });
    });
    it('should return an error when passed invalid destination branch', (done) => {
      chai.request(app)
        .post(baseURL)
        .send(oneWay[3])
        .set('authorization', validUserToken)
        .end((err, res) => {
          expect(res.status).to.eql(400);
          expect(res.body.message).to.eql('Validation Error!');
          expect(res.body.data['destination.to']).to.eql(
            'Destination does not exist'
          );
          done();
        });
    });
    it('should return an error when start branch is equal to destination', (done) => {
      chai.request(app)
        .post(baseURL)
        .send(oneWay[4])
        .set('authorization', validUserToken)
        .end((err, res) => {
          expect(res.status).to.eql(400);
          expect(res.body.message).to.eql('Validation Error!');
          expect(res.body.data['destination.to']).to.eql(
            'Start and Destination should not be the same'
          );
          done();
        });
    });
    it('should return an error when accomodation does not exist', (done) => {
      chai.request(app)
        .post(baseURL)
        .send(oneWay[5])
        .set('authorization', validUserToken)
        .end((err, res) => {
          expect(res.status).to.eql(400);
          expect(res.body.message).to.eql('Validation Error!');
          expect(res.body.data['destination.accomodation']).to.eql(
            'Accomodation does not exist'
          );
          done();
        });
    });
    it('should return an error when trip type is empty', (done) => {
      chai.request(app)
        .post(baseURL)
        .send(oneWay[6])
        .set('authorization', validUserToken)
        .end((err, res) => {
          expect(res.status).to.eql(400);
          expect(res.body.message).to.eql('Validation Error!');
          expect(res.body.data.type).to.eql('Trip type is required');
          done();
        });
    });
    it('should return an error when start branch is empty', (done) => {
      chai.request(app)
        .post(baseURL)
        .send(oneWay[7])
        .set('authorization', validUserToken)
        .end((err, res) => {
          expect(res.status).to.eql(400);
          expect(res.body.message).to.eql('Validation Error!');
          expect(res.body.data.from).to.eql('Starting point is required');
          done();
        });
    });
    it('should return an error when departure date is empty', (done) => {
      chai.request(app)
        .post(baseURL)
        .send(oneWay[8])
        .set('authorization', validUserToken)
        .end((err, res) => {
          expect(res.status).to.eql(400);
          expect(res.body.message).to.eql('Validation Error!');
          expect(res.body.data.departureDate).to.eql('Departure date is required');
          done();
        });
    });
    it('should return an error when departure date is invalid', (done) => {
      chai.request(app)
        .post(baseURL)
        .send(oneWay[9])
        .set('authorization', validUserToken)
        .end((err, res) => {
          expect(res.status).to.eql(400);
          expect(res.body.message).to.eql('Validation Error!');
          expect(res.body.data.departureDate).to.eql('Invalid departure date format');
          done();
        });
    });
    it('should return an error when travel reason is empty', (done) => {
      chai.request(app)
        .post(baseURL)
        .send(oneWay[10])
        .set('authorization', validUserToken)
        .end((err, res) => {
          expect(res.status).to.eql(400);
          expect(res.body.message).to.eql('Validation Error!');
          expect(res.body.data.reason).to.eql('Travel reason is required');
          done();
        });
    });
    it('should return a 500 error when an error occurs on the server', (done) => {
      const stub = sinon.stub(Trip, 'create')
        .rejects(new Error('Server error, Please try again later'));
      chai.request(app)
        .post(baseURL)
        .send(oneWay[0])
        .set('authorization', validUserToken)
        .end((err, res) => {
          expect(res.status).to.equal(500);
          stub.restore();
          done();
        });
    });
  });
  describe('Create return travel request', () => {
    it('should create a return travel request', (done) => {
      chai.request(app)
        .post(baseURL)
        .send(returnTrip[0])
        .set('authorization', validUserToken)
        .end((err, res) => {
          const { trip } = res.body.data;
          expect(res.status).to.equal(201);
          expect(res.body.data).to.haveOwnProperty('trip');
          expect(trip.type).to.eql(returnTrip[0].type);
          expect(trip.startBranchId).to.eql(returnTrip[0].from);
          expect(trip.reason).to.eql(returnTrip[0].reason);
          expect(new Date(trip.tripDate)).to.eql(new Date(returnTrip[0].departureDate));
          expect(new Date(trip.returnDate)).to.eql(new Date(returnTrip[0].returnDate));
          expect(trip.stop[0].destinationBranchId).to.eql(returnTrip[0].destination.to);
          expect(trip.stop[0].accomodationId).to.eql(returnTrip[0].destination.accomodation);
          done();
        });
    });
    it('should return an error when passed invalid return date', (done) => {
      chai.request(app)
        .post(baseURL)
        .send(returnTrip[1])
        .set('authorization', validUserToken)
        .end((err, res) => {
          expect(res.status).to.eql(400);
          expect(res.body.message).to.eql('Validation Error!');
          expect(res.body.data.returnDate).to.eql(
            'Invalid return date format'
          );
          done();
        });
    });
    it('should return an error when departure and return date are the same', (done) => {
      chai.request(app)
        .post(baseURL)
        .send(returnTrip[2])
        .set('authorization', validUserToken)
        .end((err, res) => {
          expect(res.status).to.eql(400);
          expect(res.body.message).to.eql('Validation Error!');
          expect(res.body.data.returnDate).to.eql(
            'Return date must be greater than departure date'
          );
          done();
        });
    });
  });
  describe('Modify Trip request status', () => {
    it('should update a trip request status', (done) => {
      const { token } = adminAuth;
      chai
        .request(app)
        .patch(`/api/v1/trips/${tripId}`)
        .set('Accept', 'application/json')
        .set({ authorization: `${token}` })
        .send({ status: 'rejected' })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.data.id).to.equal(tripId);
          expect(res.body.success).to.equal(true);
          done(err);
        });
    });
    it('should not update a trip request status without status', (done) => {
      const { token } = adminAuth;
      chai
        .request(app)
        .patch(`/api/v1/trips/${tripId}`)
        .set('Accept', 'application/json')
        .set({ authorization: `${token}` })
        .send({})
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.data.status).to.equal('Trip status is required');
          expect(res.body.success).to.equal(false);
          done(err);
        });
    });
    it('should not update a trip request status without admin priviledge', (done) => {
      const { token } = staffAuth;
      chai
        .request(app)
        .patch(`/api/v1/trips/${tripId}`)
        .set('Accept', 'application/json')
        .set({ authorization: `${token}` })
        .send({ status: 'rejected' })
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body.message).to.equal('access denied');
          expect(res.body.success).to.equal(false);
          done(err);
        });
    });
    it('should not update a trip request status with invalid status', (done) => {
      const { token } = adminAuth;
      chai
        .request(app)
        .patch(`/api/v1/trips/${tripId}`)
        .set('Accept', 'application/json')
        .set({ authorization: `${token}` })
        .send({ status: 'Rej' })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.data.status).to.equal('Invalid trip status');
          expect(res.body.success).to.equal(false);
          done(err);
        });
    });
    it('should not update a trip request status with invalid token', (done) => {
      const { token } = adminAuth;
      chai
        .request(app)
        .patch(`/api/v1/trips/${tripId}`)
        .set('Accept', 'application/json')
        .set({ authorization: `${token}notvalid` })
        .send({ status: 'Rejected' })
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body.message).to.equal('Unathorized, Your token is invalid or expired');
          expect(res.body.success).to.equal(false);
          done(err);
        });
    });

    it('should not update a trip request status with invalid token', (done) => {
      const { token } = adminAuth;
      chai
        .request(app)
        .patch(`/api/v1/trips/${invalidtripId}`)
        .set('Accept', 'application/json')
        .set({ authorization: `${token}` })
        .send({ status: 'rejected' })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.equal('Trip does not exist');
          expect(res.body.success).to.equal(false);
          done(err);
        });
    });
    it('should not modify a trip request status with invalid status', (done) => {
      const { token } = adminAuth;
      chai
        .request(app)
        .patch(`/api/v1/trips/${tripId}ff`)
        .set('Accept', 'application/json')
        .set({ authorization: `${token}` })
        .send({ status: 'rejected' })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.data.tripId).to.equal('Invalid trip id');
          expect(res.body.success).to.equal(false);
          done(err);
        });
    });
  });
});
