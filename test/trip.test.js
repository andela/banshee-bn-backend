/* eslint-disable no-unused-expressions */
import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import app from '../src/index';
import jwtHelper from '../src/helpers/Token';
import users from './mockData/mockAuth';
import models from '../src/database/models';
import mockTripRequests from './mockData/mockTrips';

const { expect } = chai;
chai.use(chaiHttp);
const { completeLoginWithCode, credentials } = users;
const { Trip } = models;
const { oneWayTravelRequests: oneWay } = mockTripRequests;
let validUserToken;

const baseURL = '/api/v1/trips';

describe('Travel Request', () => {
  describe('Get Users Requests ancd details', () => {
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

describe('Create one-way request', () => {
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
  it('should create a one-way travel request', (done) => {
    chai.request(app)
      .post('/api/v1/trips?type=oneway')
      .send(oneWay[0])
      .set('authorization', validUserToken)
      .end((err, res) => {
        const { trip } = res.body.data;
        expect(res.status).to.equal(201);
        expect(res.body.data).to.haveOwnProperty('trip');
        expect(trip.startBranchId).to.eql(oneWay[0].from);
        expect(trip.reason).to.eql(oneWay[0].reason);
        expect(new Date(trip.tripDate)).to.eql(new Date(oneWay[0].departureDate));
        expect(trip.stop.destinationBranchId).to.eql(oneWay[0].destination.to);
        expect(trip.stop.accomodationId).to.eql(oneWay[0].destination.accomodation);
        done();
      });
  });

  it('should return an error when the query parameter is invalid', (done) => {
    chai.request(app)
      .post('/api/v1/trips?type=invalid')
      .send(oneWay[0])
      .set('authorization', validUserToken)
      .end((err, res) => {
        expect(res.status).to.eql(400);
        expect(res.body.message).to.eql('Validation Error!');
        expect(res.body.data.type).to.eql('Invalid query parameter');
        done();
      });
  });
  it('should return an error when passed invalid start branch', (done) => {
    chai.request(app)
      .post('/api/v1/trips?type=oneway')
      .send(oneWay[1])
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
      .post('/api/v1/trips?type=oneway')
      .send(oneWay[2])
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
      .post('/api/v1/trips?type=oneway')
      .send(oneWay[3])
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
      .post('/api/v1/trips?type=oneway')
      .send(oneWay[4])
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
  it('should return a 500 error when an error occurs on the server', (done) => {
    const stub = sinon.stub(Trip, 'create')
      .rejects(new Error('Server error, Please try again later'));
    chai.request(app)
      .post('/api/v1/trips?type=oneway')
      .send(oneWay[0])
      .set('authorization', validUserToken)
      .end((err, res) => {
        expect(res.status).to.equal(500);
        stub.restore();
        done();
      });
  });
});
