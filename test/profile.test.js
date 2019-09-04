import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/index';
import users from './mockData/mockAuth';
import jwtHelper from '../src/helpers/Token';

const { expect } = chai;
chai.use(chaiHttp);

const baseURL = '/api/v1';

const { credentials, user9, userNineLoginDetails } = users;

let userToken;
let ownerToken;
let ownerTokenUnverified;
const token = jwtHelper.generateToken({ email: 'femitj@gmail.com' });

describe('Profile Routes', () => {
  describe('GET Profile CONTROLLER TEST', () => {
    it('should successfully get user token', (done) => {
      chai
        .request(app)
        .post(`${baseURL}/auth/login`)
        .send(credentials)
        .end((err, res) => {
          const { user } = res.body.data;
          // eslint-disable-next-line prefer-destructuring
          userToken = user.token;
          done();
        });
    });
    it('should successfully get owner token', (done) => {
      chai
        .request(app)
        .post(`${baseURL}/auth/register/company`)
        .send(user9)
        .end((err, res) => {
          const { user } = res.body.data;
          // eslint-disable-next-line prefer-destructuring
          ownerTokenUnverified = user.token;
          done();
        });
    });
    it('should verify a user', (done) => {
      chai
        .request(app)
        .patch(`${baseURL}/auth/verify?token=${token}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.key('success', 'code', 'message');
          done();
        });
    });
    it('should successfully get user token', (done) => {
      chai
        .request(app)
        .post(`${baseURL}/auth/login`)
        .send(userNineLoginDetails)
        .end((err, res) => {
          const { user } = res.body.data;
          // eslint-disable-next-line prefer-destructuring
          ownerToken = user.token;
          done();
        });
    });
    it('should successfully get user profile', (done) => {
      chai
        .request(app)
        .get(`${baseURL}/profile`)
        .set('authorization', userToken)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.key('success', 'code', 'message', 'data');
          expect(res.body.data.profile).to.be.an('object');
          done(err);
        });
    });
  });
  describe('PATCH Profile CONTROLLER TEST', () => {
    it('should successfully update a owner profile', (done) => {
      chai
        .request(app)
        .patch(`${baseURL}/profile`)
        .set('authorization', ownerToken)
        .send({ companyName: 'PWCCorporation' })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.key('success', 'code', 'message', 'data');
          expect(res.body.data.profile).to.be.an('object');
          done(err);
        });
    });
    it('should return an error for owner account', (done) => {
      chai
        .request(app)
        .patch(`${baseURL}/profile`)
        .set('authorization', ownerTokenUnverified)
        .send({ companyName: 'PWCCorporation' })
        .end((err, res) => {
          expect(res).to.have.status(403);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.key('success', 'code', 'message');
          done(err);
        });
    });
    it('should successfully update a user profile', (done) => {
      chai
        .request(app)
        .patch(`${baseURL}/profile`)
        .set('authorization', userToken)
        .send({ gender: 'male' })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.key('success', 'code', 'message', 'data');
          expect(res.body.data.profile).to.be.an('object');
          done(err);
        });
    });
    it('should successfully update a user profile', (done) => {
      chai
        .request(app)
        .patch(`${baseURL}/profile`)
        .set('authorization', userToken)
        .send({ dob: '2001-04-03' })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.key('success', 'code', 'message', 'data');
          expect(res.body.data.profile).to.be.an('object');
          done(err);
        });
    });
    it('should respond with error for invalid gender', (done) => {
      chai
        .request(app)
        .patch(`${baseURL}/profile`)
        .set('authorization', userToken)
        .send({ gender: 'afrodite' })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          done(err);
        });
    });
    it('should respond with error for invalid DOB', (done) => {
      chai
        .request(app)
        .patch(`${baseURL}/profile`)
        .set('authorization', userToken)
        .send({ dob: '2020-09-31' })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.eql('Validation Error!');
          expect(res.body.data.dob).to.eql('Users must be 18 and above');
          done(err);
        });
    });
    it('should respond with error for invalid firstname field', (done) => {
      chai
        .request(app)
        .patch(`${baseURL}/profile`)
        .set('authorization', userToken)
        .send({ firstName: 'femi11' })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.eql('Validation Error!');
          expect(res.body.data.firstName).to.eql('First name should only contain alphabets');
          done(err);
        });
    });
    it('should respond with error for invalid lastname field', (done) => {
      chai
        .request(app)
        .patch(`${baseURL}/profile`)
        .set('authorization', userToken)
        .send({ lastName: 'femi11' })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.eql('Validation Error!');
          expect(res.body.data.lastName).to.eql('Last name should only contain alphabets');
          done(err);
        });
    });
    it('should respond with error for empty company name field', (done) => {
      chai
        .request(app)
        .patch(`${baseURL}/profile`)
        .set('authorization', ownerToken)
        .send({ companyName: '' })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          done(err);
        });
    });
    it('should respond with error for empty company address field', (done) => {
      chai
        .request(app)
        .patch(`${baseURL}/profile`)
        .set('authorization', ownerToken)
        .send({ address: '' })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          done(err);
        });
    });
  });
});
