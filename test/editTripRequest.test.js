import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import app from '../src/index';
import models from '../src/database/models';
import mockUsers from './mockData/mockAuth';
import mockTrips from './mockData/mockUpdatedTrips';

const { expect } = chai;
chai.use(chaiHttp);
const { Trip } = models;
const { credentials } = mockUsers;
const {
  oneWayTrip, returnTrip, nonExistentTrip, closedTrip, multiTrip
} = mockTrips;
let validUserToken;

const baseURL = '/api/v1/trips';

describe('Update trip request', () => {
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
  it('should return an error if trip does not exist', (done) => {
    chai.request(app)
      .put(`${baseURL}/${nonExistentTrip.id}`)
      .send(nonExistentTrip)
      .set('authorization', validUserToken)
      .end((err, res) => {
        expect(res.status).to.eql(404);
        expect(res.body.message).to.eql('Trip does not exist');
        done();
      });
  });
  it('should return an error if trip is closed', (done) => {
    chai.request(app)
      .put(`${baseURL}/${closedTrip.id}`)
      .send(closedTrip)
      .set('authorization', validUserToken)
      .end((err, res) => {
        expect(res.status).to.eql(403);
        expect(res.body.message).to.eql('This trip is no longer open');
        done();
      });
  });

  describe('Update oneway trip request', () => {
    it('should successfully update a oneway trip request', (done) => {
      chai.request(app)
        .put(`${baseURL}/${oneWayTrip[0].id}`)
        .send(oneWayTrip[0])
        .set('authorization', validUserToken)
        .end((err, res) => {
          const { destinations } = oneWayTrip[0];
          const { trip } = res.body.data;
          const { stop } = trip;
          expect(res.status).to.equal(200);
          expect(res.body.data).to.haveOwnProperty('trip');
          expect(trip.startBranchId).to.eql(oneWayTrip[0].from);
          expect(trip.reason).to.eql(oneWayTrip[0].reason);
          expect(stop[0].destinationBranchId).to.eql(destinations[0].to);
          expect(stop[0].accomodationId).to.eql(destinations[0].accomodation);
          done();
        });
    });
    it('should return an error when passed invalid start branch', (done) => {
      chai.request(app)
        .put(`${baseURL}/${oneWayTrip[0].id}`)
        .send(oneWayTrip[1])
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
        .put(`${baseURL}/${oneWayTrip[0].id}`)
        .send(oneWayTrip[2])
        .set('authorization', validUserToken)
        .end((err, res) => {
          expect(res.status).to.eql(400);
          expect(res.body.message).to.eql('Validation Error!');
          expect(res.body.data['destinations[0].to']).to.eql(
            'Destination branch does not exist'
          );
          done();
        });
    });
    it('should return an error when start branch is equal to destination', (done) => {
      chai.request(app)
        .put(`${baseURL}/${oneWayTrip[0].id}`)
        .send(oneWayTrip[3])
        .set('authorization', validUserToken)
        .end((err, res) => {
          expect(res.status).to.eql(400);
          expect(res.body.message).to.eql('Validation Error!');
          expect(res.body.data['destinations[0].to']).to.eql(
            'Start and Destination branch should not be the same'
          );
          done();
        });
    });
    it('should return an error when accomodation does not exist', (done) => {
      chai.request(app)
        .put(`${baseURL}/${oneWayTrip[0].id}`)
        .send(oneWayTrip[4])
        .set('authorization', validUserToken)
        .end((err, res) => {
          expect(res.status).to.eql(400);
          expect(res.body.message).to.eql('Validation Error!');
          expect(res.body.data['destinations[0].accomodation']).to.eql(
            'Accomodation does not exist'
          );
          done();
        });
    });
    it('should return an error when destination Id does not exist', (done) => {
      chai.request(app)
        .put(`${baseURL}/${oneWayTrip[0].id}`)
        .send(oneWayTrip[5])
        .set('authorization', validUserToken)
        .end((err, res) => {
          expect(res.status).to.eql(400);
          expect(res.body.message).to.eql('Validation Error!');
          expect(res.body.data['destinations[0].id']).to.eql(
            'Destination does not exist'
          );
          done();
        });
    });
    it('should return an error when departureDate is invalid', (done) => {
      chai.request(app)
        .put(`${baseURL}/${oneWayTrip[0].id}`)
        .send(oneWayTrip[6])
        .set('authorization', validUserToken)
        .end((err, res) => {
          expect(res.status).to.eql(400);
          expect(res.body.message).to.eql('Validation Error!');
          expect(res.body.data.departureDate).to.eql(
            'Invalid departure date format'
          );
          done();
        });
    });
    it('should return an error when reason is empty', (done) => {
      chai.request(app)
        .put(`${baseURL}/${oneWayTrip[0].id}`)
        .send(oneWayTrip[7])
        .set('authorization', validUserToken)
        .end((err, res) => {
          expect(res.status).to.eql(400);
          expect(res.body.message).to.eql('Validation Error!');
          expect(res.body.data.reason).to.eql(
            'Travel reason is required'
          );
          done();
        });
    });
    it('should return an error when destination Id is invalid', (done) => {
      chai.request(app)
        .put(`${baseURL}/${oneWayTrip[8].id}`)
        .send(oneWayTrip[8])
        .set('authorization', validUserToken)
        .end((err, res) => {
          expect(res.status).to.eql(400);
          expect(res.body.message).to.eql('Validation Error!');
          expect(res.body.data['destinations[0].id']).to.eql(
            'Invalid destination Id format'
          );
          done();
        });
    });
  });

  describe('Return trip test', () => {
    it('should return an error when return date is invalid', (done) => {
      chai.request(app)
        .put(`${baseURL}/${returnTrip[0].id}`)
        .send(returnTrip[0])
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
    it('should return an error when return date is less than or equal to departure date', (done) => {
      chai.request(app)
        .put(`${baseURL}/${returnTrip[0].id}`)
        .send(returnTrip[1])
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
    it('should successfully update a return trip request', (done) => {
      chai.request(app)
        .put(`${baseURL}/${returnTrip[0].id}`)
        .send(returnTrip[2])
        .set('authorization', validUserToken)
        .end((err, res) => {
          const { departureDate, returnDate, destinations } = returnTrip[2];
          const { trip } = res.body.data;
          const { stop } = trip;
          expect(res.status).to.equal(200);
          expect(res.body.data).to.haveOwnProperty('trip');
          expect(trip.startBranchId).to.eql(returnTrip[0].from);
          expect(trip.reason).to.eql(returnTrip[0].reason);
          expect(new Date(trip.tripDate)).to.eql(new Date(departureDate));
          expect(new Date(trip.returnDate)).to.eql(new Date(returnDate));
          expect(stop[0].destinationBranchId).to.eql(destinations[0].to);
          expect(stop[0].accomodationId).to.eql(destinations[0].accomodation);
          done();
        });
    });
    it('should successfully update a return trip request', (done) => {
      chai.request(app)
        .put(`${baseURL}/${returnTrip[3].id}`)
        .send(returnTrip[3])
        .set('authorization', validUserToken)
        .end((err, res) => {
          const { departureDate, returnDate } = returnTrip[3];
          const { trip } = res.body.data;
          const { stop } = trip;
          expect(res.status).to.equal(200);
          expect(res.body.data).to.haveOwnProperty('trip');
          expect(trip.startBranchId).to.eql(returnTrip[0].from);
          expect(trip.reason).to.eql(returnTrip[0].reason);
          expect(new Date(trip.tripDate)).to.eql(new Date(departureDate));
          expect(new Date(trip.returnDate)).to.eql(new Date(returnDate));
          expect(stop).to.be.an('array');
          done();
        });
    });
  });

  describe('Multi-city trip request test', () => {
    it('should successfully update a multi-city trip request', (done) => {
      chai.request(app)
        .put(`${baseURL}/${multiTrip[0].id}`)
        .send(multiTrip[0])
        .set('authorization', validUserToken)
        .end((err, res) => {
          const { departureDate, destinations } = multiTrip[0];
          const { trip } = res.body.data;
          const { stop } = trip;
          expect(res.status).to.equal(200);
          expect(res.body.data).to.haveOwnProperty('trip');
          expect(trip.startBranchId).to.eql(multiTrip[0].from);
          expect(trip.reason).to.eql(multiTrip[0].reason);
          expect(new Date(trip.tripDate)).to.eql(new Date(departureDate));
          expect(stop[1].destinationBranchId).to.eql(destinations[0].to);
          expect(stop[1].accomodationId).to.eql(destinations[0].accomodation);
          done();
        });
    });
    it('should return an error when one or more destination branches are the same', (done) => {
      chai.request(app)
        .put(`${baseURL}/${multiTrip[1].id}`)
        .send(multiTrip[1])
        .set('authorization', validUserToken)
        .end((err, res) => {
          expect(res.status).to.eql(400);
          expect(res.body.message).to.eql('Validation Error!');
          expect(res.body.data['destinations[0].to']).to.eql(
            'One or more destination branches are the same'
          );
          done();
        });
    });
    it('should return a 500 error when an error occurs on the server', (done) => {
      const stub = sinon.stub(Trip, 'update')
        .rejects(new Error('Server error, Please try again later'));
      chai.request(app)
        .put(`${baseURL}/${multiTrip[1].id}`)
        .send(multiTrip[0])
        .set('authorization', validUserToken)
        .end((err, res) => {
          expect(res.status).to.equal(500);
          stub.restore();
          done();
        });
    });
  });
});
