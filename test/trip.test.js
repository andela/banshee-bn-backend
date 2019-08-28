/* eslint-disable no-unused-expressions */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/index';
import jwtHelper from '../src/helpers/Token';
import users from './mockData/mockAuth';

const { expect } = chai;
chai.use(chaiHttp);
const { completeLoginWithCode, credentials } = users;

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
