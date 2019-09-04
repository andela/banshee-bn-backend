import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import app from '../src/index';
import models from '../src/database/models';
import feedbackRequest from './mockData/mockFeedback';
import users from './mockData/mockAuth';

const { expect } = chai;
chai.use(chaiHttp);

const baseURL = '/api/v1';

const { AccomodationFeedback } = models;
const { accomodationFeedbacks } = feedbackRequest;
const { user10, credentials } = users;

let validToken, credentialsToken;

describe('Feedbacks Request', () => {
  describe('Post Accomodation feedbacks request', () => {
    it('should return a valid token', (done) => {
      chai
        .request(app)
        .post(`${baseURL}/auth/login`)
        .send(user10)
        .end((err, res) => {
          const { user } = res.body.data;
          // eslint-disable-next-line prefer-destructuring
          validToken = user.token;
          done();
        });
    });
    it('should return a valid token', (done) => {
      chai
        .request(app)
        .post(`${baseURL}/auth/login`)
        .send(credentials)
        .end((err, res) => {
          const { user } = res.body.data;
          // eslint-disable-next-line prefer-destructuring
          credentialsToken = user.token;
          done();
        });
    });
    it('should successfully post a feedback for accomodation', (done) => {
      chai
        .request(app)
        .post(`${baseURL}/accomodation/feedback`)
        .send(accomodationFeedbacks[0])
        .set('authorization', validToken)
        .end((err, res) => {
          expect(res).to.have.status(201);
          done();
        });
    });
    it('should return error if review is not supplied', (done) => {
      chai
        .request(app)
        .post(`${baseURL}/accomodation/feedback`)
        .send(accomodationFeedbacks[1])
        .set('authorization', validToken)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          done(err);
        });
    });
    it('should return error if like & dislike is not supplied', (done) => {
      chai
        .request(app)
        .post(`${baseURL}/accomodation/feedback`)
        .send(accomodationFeedbacks[2])
        .set('authorization', validToken)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          done(err);
        });
    });
    it('should return error if Accomodation ID is not supplied', (done) => {
      chai
        .request(app)
        .post(`${baseURL}/accomodation/feedback`)
        .send(accomodationFeedbacks[3])
        .set('authorization', validToken)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          done(err);
        });
    });
    it('should return error if Trip ID is not supplied', (done) => {
      chai
        .request(app)
        .post(`${baseURL}/accomodation/feedback`)
        .send(accomodationFeedbacks[4])
        .set('authorization', validToken)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          done(err);
        });
    });
    it('should return error if Trip ID is invalid', (done) => {
      chai
        .request(app)
        .post(`${baseURL}/accomodation/feedback`)
        .send(accomodationFeedbacks[0])
        .set('authorization', credentialsToken)
        .end((err, res) => {
          expect(res).to.have.status(403);
          expect(res.body).to.be.an('object');
          done(err);
        });
    });
    it('should return error if Accomodation ID is invalid', (done) => {
      chai
        .request(app)
        .post(`${baseURL}/accomodation/feedback`)
        .send(accomodationFeedbacks[5])
        .set('authorization', validToken)
        .end((err, res) => {
          expect(res).to.have.status(403);
          expect(res.body).to.be.an('object');
          done(err);
        });
    });
    it('should return a 500 error when an error occurs on the server', (done) => {
      const stub = sinon.stub(AccomodationFeedback, 'create')
        .rejects(new Error('Server error, Please try again later'));
      chai.request(app)
        .post(`${baseURL}/accomodation/feedback`)
        .send(accomodationFeedbacks[0])
        .set('authorization', validToken)
        .end((err, res) => {
          expect(res.status).to.equal(500);
          stub.restore();
          done();
        });
    });
  });
});
