import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import app from '../src/index';
import db from '../src/database/models';
import users from './mockData/mockAuth';
import ratings from './mockData/mockRatings';

const { expect } = chai;
chai.use(chaiHttp);

const baseURL = '/api/v1';

const { Rating } = db;
const { user10 } = users;
const { accomodationRatings, userOne } = ratings;

let validToken;

// check successful post
describe('Ratings', () => {
  describe('Users post a request to rate an accomodation', () => {
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
    it('should succesfully update if previous rating is found for an accomodation', (done) => {
      chai
        .request(app)
        .post(`${baseURL}/accomodation/ratings`)
        .send(accomodationRatings[1])
        .set('authorization', validToken)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.message).to.eq('Thank you for rating this accomodation');
          done();
        });
    });
    it('should succesfully rate an accomodation', (done) => {
      chai
        .request(app)
        .post(`${baseURL}/accomodation/ratings`)
        .send(accomodationRatings[0])
        .set('authorization', validToken)
        .end((err, res) => {
          expect(res).to.have.status(201);
          done();
        });
    });
    it('should return an error if accomodation does not exist', (done) => {
      chai
        .request(app)
        .post(`${baseURL}/accomodation/ratings`)
        .send(accomodationRatings[2])
        .set('authorization', validToken)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.be.an('object');
          done(err);
        });
    });
    it('should return an error if accomodation Id is not supplied', (done) => {
      chai
        .request(app)
        .post(`${baseURL}/accomodation/ratings`)
        .send(accomodationRatings[3])
        .set('authorization', validToken)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.eql('Validation Error!');
          expect(res.body.data.accomodationId).to.eql('Accomodation Id is required');
          done(err);
        });
    });
    it('should return an error if rating value is not supplied', (done) => {
      chai
        .request(app)
        .post(`${baseURL}/accomodation/ratings`)
        .send(accomodationRatings[4])
        .set('authorization', validToken)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.eql('Validation Error!');
          expect(res.body.data.ratingValue).to.eql('Rating is required');
          done(err);
        });
    });
    it('should return an error if rating is greater than 5', (done) => {
      chai
        .request(app)
        .post(`${baseURL}/accomodation/ratings`)
        .send(accomodationRatings[5])
        .set('authorization', validToken)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.eql('Validation Error!');
          expect(res.body.data.ratingValue).to.eql('Ratings should be between the number 0 to 5');
          done(err);
        });
    });
    it('should return a 500 error when an error occurs on the server', (done) => {
      const stub = sinon.stub(Rating, 'update')
        .rejects(new Error('Server error, Please try again later'));
      chai.request(app)
        .post(`${baseURL}/accomodation/ratings`)
        .send(accomodationRatings[0])
        .set('authorization', validToken)
        .end((err, res) => {
          expect(res.status).to.equal(500);
          stub.restore();
          done();
        });
    });
  });
});
