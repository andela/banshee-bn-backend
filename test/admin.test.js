import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import app from '../src/index';
import models from '../src/database/models';
import jwtHelper from '../src/helpers/Token';
import users from './mockData/mockAuth';
import admin from './mockData/mockAdmin';


const { expect } = chai;
chai.use(chaiHttp);
const {
  superAdminLogin, credentials, completeLoginWithCode,
  user6, loginWithUnregisteredEmail, user8, credentialsWithoutRole,
  unverifiedUser, managerLogin
} = users;

const {
  location, inCompleteLocation, location2, branch, branch2,
  branch3, branch4
} = admin;
const { Location, Branch, User } = models;

const baseUrl = '/api/v1/';

describe('Admin controller', () => {
  describe('Update user role', () => {
    it('should update a user\'s role', (done) => {
      const token = jwtHelper.generateToken(superAdminLogin);

      chai
        .request(app)
        .patch(`${baseUrl}/user/${credentials.email}/role`)
        .set('x-access-token', token)
        .send({ role: 'travel admin' })
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
        .patch(`${baseUrl}/user/${credentials.email}/role`)
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
        .patch(`${baseUrl}/user/${user6.email}/role`)
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
        .patch(`${baseUrl}/user/${loginWithUnregisteredEmail.email}/role`)
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
        .patch(`${baseUrl}/user/${user8.email}/role`)
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
        .patch(`${baseUrl}/user/${unverifiedUser.email}/role`)
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
        .patch(`${baseUrl}/user/${credentialsWithoutRole.email}/role`)
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
        .patch(`${baseUrl}/user/${credentials.email}/role`)
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
        .patch(`${baseUrl}/user/${credentials.email}/role`)
        .send({ role: 'travel admin' })
        .end((err, res) => {
          expect(res.status).to.eq(401);
          // eslint-disable-next-line no-unused-expressions
          expect(res.body.success).to.be.false;
          expect(res.body.message).to.eq('Unauthorized, You did not provide a token');
          done();
        });
    });
  });

  describe('Retrieve all users', () => {
    it('should return all the users in a company', (done) => {
      const token = jwtHelper.generateToken(superAdminLogin);
      chai
        .request(app)
        .get(`${baseUrl}/user/all`)
        .set('authorization', token)
        .end((err, res) => {
          const { success, message, data } = res.body;
          expect(res).to.have.status(200);
          expect(success).to.equal(true);
          expect(message).to.eql('Users retrieved');
          expect(data).to.be.an('array');
          done(err);
        });
    });

    it('should return a 401 error when an error occurs on the server', (done) => {
      const token = jwtHelper.generateToken(superAdminLogin);
      const stub = sinon.stub(User, 'findAll')
        .rejects(new Error('Server error, Please try again later'));
      chai
        .request(app)
        .get(`${baseUrl}/user/all`)
        .set('authorization', token)
        .end((err, res) => {
          expect(res.status).to.equal(401);
          stub.restore();
          done(err);
        });
    });
  });
  describe('Create company location', () => {
    const managerToken = jwtHelper.generateToken(managerLogin);

    it('should create a company location', (done) => {
      chai.request(app).post(`${baseUrl}/location/create`)
        .set('x-access-token', managerToken)
        .send(location)
        .end((err, res) => {
          expect(res.status).to.eq(201);
          expect(res.body.message).to.eq('Company location created successfully');
          expect(res.body.data.city).to.eq(location.city);
          done();
        });
    });
    it('should return error if all fields are not filled', (done) => {
      chai.request(app).post(`${baseUrl}/location/create`)
        .set('x-access-token', managerToken)
        .send(inCompleteLocation)
        .end((err, res) => {
          expect(res.status).to.eq(400);
          expect(res.body.message).to.eq('Validation Error!');
          done();
        });
    });
    it('should return error if location is already created', (done) => {
      chai.request(app).post(`${baseUrl}/location/create`)
        .set('x-access-token', managerToken)
        .send(location)
        .end((err, res) => {
          expect(res.status).to.eq(400);
          expect(res.body.message).to.eq('Validation Error!');
          done();
        });
    });
    it('should return error 500 if there is server error', (done) => {
      const stub = sinon.stub(Location, 'create').rejects(new Error('Server error, try again'));

      chai.request(app).post(`${baseUrl}/location/create`)
        .set('x-access-token', managerToken)
        .send(location2)
        .end((err, res) => {
          expect(res.status).to.eq(500);
          expect(res.body.message).to.eq('Server error, try again');
          stub.restore();
          done();
        });
    });
  });
  describe('Create company branch', () => {
    const managerToken = jwtHelper.generateToken(managerLogin);

    it('should create a company branch', (done) => {
      chai.request(app).post(`${baseUrl}/branch/create`)
        .set('x-access-token', managerToken)
        .send(branch)
        .end((err, res) => {
          expect(res.status).to.eq(201);
          expect(res.body.message).to.eq('Company branch created successfully');
          done();
        });
    });
    it('should return error if all fields are not filled', (done) => {
      chai.request(app).post(`${baseUrl}/branch/create`)
        .set('x-access-token', managerToken)
        .send(branch2)
        .end((err, res) => {
          expect(res.status).to.eq(400);
          expect(res.body.message).to.eq('Validation Error!');
          done();
        });
    });
    it('should return error if branch is already registered', (done) => {
      chai.request(app).post(`${baseUrl}/branch/create`)
        .set('x-access-token', managerToken)
        .send(branch)
        .end((err, res) => {
          expect(res.status).to.eq(400);
          expect(res.body.message).to.eq('Validation Error!');
          done();
        });
    });

    it('should return error if branch is not known', (done) => {
      chai.request(app).post(`${baseUrl}/branch/create`)
        .set('x-access-token', managerToken)
        .send(branch3)
        .end((err, res) => {
          expect(res.status).to.eq(400);
          expect(res.body.message).to.eq('Validation Error!');
          expect(res.body.data.locationId).to.eq('Unknown location');
          done();
        });
    });

    it('should return error 500 if there is server error', (done) => {
      const stub = sinon.stub(Branch, 'create').rejects(new Error('Server error, try again'));

      chai.request(app).post(`${baseUrl}/branch/create`)
        .set('x-access-token', managerToken)
        .send(branch4)
        .end((err, res) => {
          expect(res.status).to.eq(500);
          expect(res.body.message).to.eq('Server error, try again');
          stub.restore();
          done();
        });
    });
  });
});
