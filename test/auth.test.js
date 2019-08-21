import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import app from '../src/index';
import users from './mockData/mockAuth';

dotenv.config();
const baseUrl = '/api/v1/auth';
const {
  user1, user2, user3, user4
} = users;

chai.use(chaiHttp);

describe('SIGNUP CONTROLLER TEST', () => {
  it('should return a token on successful registration', (done) => {
    chai
      .request(app)
      .post(`${baseUrl}/signup`)
      .send(user1)
      .end((err, res) => {
        const { user } = res.body.data;
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(user).to.be.a('object');
        expect(user).to.have.keys('email', 'token');
        done();
      });
  });
  it('should return a token on successful registration', (done) => {
    chai
      .request(app)
      .post(`${baseUrl}/signup`)
      .send(user2)
      .end((err, res) => {
        const { user } = res.body.data;
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(user).to.be.a('object');
        expect(user).to.have.keys('email', 'token');
        done();
      });
  });
  it('should return a error', (done) => {
    chai
      .request(app)
      .post(`${baseUrl}/signup`)
      .send(user3)
      .end((err, res) => {
        expect(res).to.have.status(500);
        done();
      });
  });
  it('should return a error if User company code is invalid', (done) => {
    chai
      .request(app)
      .post(`${baseUrl}/signup`)
      .send(user4)
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
});
