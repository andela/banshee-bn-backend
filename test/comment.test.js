import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import app from '../src/index';
import models from '../src/database/models';
import mockAuth from './mockData/mockAuth';
import mockComments from './mockData/mockComment';

chai.use(chaiHttp);
const { expect } = chai;

const { Comment } = models;
const { user10 } = mockAuth;
const { myComments } = mockComments;
const baseURL = '/api/v1/trips';
const invalidID = 'ffe25dbe-29ea-4759-8461-ed116f6739da';
let userToken;

describe('Comments API', () => {
  before('Login to get token', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send(user10)
      .end((err, res) => {
        const { token } = res.body.data.user;
        userToken = token;
        done(err);
      });
  });
  describe('POST /trips/:tripId/comment', () => {
    it('should successfully post a comment', (done) => {
      chai
        .request(app)
        .post(`${baseURL}/${myComments[0].tripId}/comment`)
        .send(myComments[0])
        .set('authorization', userToken)
        .end((err, res) => {
          expect(res).to.have.status(201);
          done(err);
        });
    });

    it('should throw an error if trip ID is invalid', (done) => {
      chai
        .request(app)
        .post(`${baseURL}/${invalidID}/comment`)
        .send(myComments[0])
        .set('authorization', userToken)
        .end((err, res) => {
          expect(res).to.have.status(400);
          done(err);
        });
    });

    it('should return a 500 error when an error occurs on the server', (done) => {
      const stub = sinon.stub(Comment, 'create')
        .rejects(new Error('Server error, Please try again later'));
      chai.request(app)
        .post(`${baseURL}/${myComments[0].tripId}/comment`)        
        .send(myComments[0])
        .set('authorization', userToken)
        .end((err, res) => {
          expect(res.status).to.equal(500);
          stub.restore();
          done(err);
        });
    });
  });
});
