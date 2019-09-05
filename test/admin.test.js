import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/index';
import jwtHelper from '../src/helpers/Token';
import users from './mockData/mockAuth';

const { expect } = chai;
chai.use(chaiHttp);
const {
  superAdminLogin, credentials, completeLoginWithCode,
  user6, loginWithUnregisteredEmail, user8, credentialsWithoutRole,
  unverifiedUser
} = users;

const baseUrl = '/api/v1/user';

describe('Admin controller', () => {
  describe('Update user role', () => {
    it('should update a user\'s role', (done) => {
      const token = jwtHelper.generateToken(superAdminLogin);

      chai
        .request(app)
        .patch(`${baseUrl}/${credentials.email}/role`)
        .set('x-access-token', token)
        .send({ role: 'staff' })
        .end((err, res) => {
          expect(res.status).to.eq(400);
          expect(res.body.message).to.eq('User role did not change');
          done();
        });
    });
    it('should update a user\'s role', (done) => {
      const token = jwtHelper.generateToken(superAdminLogin);

      chai
        .request(app)
        .patch(`${baseUrl}/${credentials.email}/role`)
        .set('x-access-token', token)
        .send({ role: 'manager' })
        .end((err, res) => {
          expect(res.status).to.eq(200);
          expect(res.body.message).to.eq('User role successfully updated');
          expect(res.body.data.role).to.eq('manager');
          done();
        });
    });
    
    it('should return error if it is not a super admin', (done) => {
      const token = jwtHelper.generateToken(completeLoginWithCode);

      chai
        .request(app)
        .patch(`${baseUrl}/${user6.email}/role`)
        .set('x-access-token', token)
        .send({ role: 'manager' })
        .end((err, res) => {
          expect(res.status).to.eq(401);
          expect(res.body.message).to.eq('Only active super admins can access this resource');
          done();
        });
    });
    it('should return error if user is not found', (done) => {
      const token = jwtHelper.generateToken(superAdminLogin);

      chai
        .request(app)
        .patch(`${baseUrl}/${loginWithUnregisteredEmail.email}/role`)
        .set('x-access-token', token)
        .send({ role: 'manager' })
        .end((err, res) => {
          expect(res.status).to.eq(404);
          expect(res.body.message).to.eq('User not found');
          done();
        });
    });
    it('should return error if user role and the request role are the same', (done) => {
      const token = jwtHelper.generateToken(superAdminLogin);

      chai
        .request(app)
        .patch(`${baseUrl}/${user8.email}/role`)
        .set('x-access-token', token)
        .send({ role: 'staff' })
        .end((err, res) => {
          expect(res.status).to.eq(404);
          expect(res.body.message).to.eq('User not found');
          done();
        });
    });
    it('should return error if user is not active', (done) => {
      const token = jwtHelper.generateToken(superAdminLogin);

      chai
        .request(app)
        .patch(`${baseUrl}/${unverifiedUser.email}/role`)
        .set('x-access-token', token)
        .send({ role: 'travel admin' })
        .end((err, res) => {
          expect(res.status).to.eq(404);
          expect(res.body.message).to.eq('User not found');
          done();
        });
    });
    it('should return error if invalid role is supplied', (done) => {
      const token = jwtHelper.generateToken(superAdminLogin);

      chai
        .request(app)
        .patch(`${baseUrl}/${credentialsWithoutRole.email}/role`)
        .set('x-access-token', token)
        .send({ role: 'travel' })
        .end((err, res) => {
          expect(res.status).to.eq(400);
          expect(res.body.message).to.eq('Validation Error!');
          expect(res.body.data.role).to.eq('Supply a valid role');
          done();
        });
    });
    it('should return error 500 if invalid data is supplied', (done) => {
      const token = jwtHelper.generateToken(superAdminLogin);

      chai
        .request(app)
        .patch(`${baseUrl}/${credentials.email}/role`)
        .set('x-access-token', token)
        .send({ role: 'travel admin\'' })
        .end((err, res) => {
          expect(res.status).to.eq(500);
          // eslint-disable-next-line no-unused-expressions
          expect(res.body.success).to.be.false;
          done();
        });
    });
    it('should return error if token is not supplied', (done) => {

      chai
        .request(app)
        .patch(`${baseUrl}/${credentials.email}/role`)
        .send({ role: 'travel admin' })
        .end((err, res) => {
          expect(res.status).to.eq(401);
          // eslint-disable-next-line no-unused-expressions
          expect(res.body.success).to.be.false;
          expect(res.body.message).to.eq('Unauthorized, Your did not provide a token');
          done();
        });
    });
  });
});