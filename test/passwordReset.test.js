import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import app from '../src/index';
import models from '../src/database/models';
import mockUsers from './mockData/mockAuth';
import mockToken from './mockData/mockToken';

chai.use(chaiHttp);

const { expect } = chai;
const { User } = models;
const { user7: mockUser } = mockUsers;

describe('User forgot password test', () => {
  it('should return an error if email does not exist', (done) => {
    chai.request(app)
      .post('/api/v1/auth/forgot_password')
      .send({
        email: 'non-existent@gmail.com'
      })
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('Email does not exist');
        done();
      });
  });
  it('should return an error if email is empty', (done) => {
    chai.request(app)
      .post('/api/v1/auth/forgot_password')
      .send({
        email: '  '
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('Validation Error!');
        expect(res.body.data.email).to.equal('Email is required');
        done();
      });
  });
  it('should return an error if email is invalid', (done) => {
    chai.request(app)
      .post('/api/v1/auth/forgot_password')
      .send({
        email: 'very_invalid_email'
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('Validation Error!');
        expect(res.body.data.email).to.equal('Invalid email format');
        done();
      });
  });
  it('should send a password reset mail', (done) => {
    chai.request(app)
      .post('/api/v1/auth/forgot_password')
      .send(mockUser)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.success).to.equal(true);
        expect(res.body.message).to.equal('Password reset mail sent');
        done();
      });
  });
  it('should return a 500 error when an error occurs on the server', (done) => {
    const stub = sinon.stub(User, 'findOne').rejects(new Error('Internal server error'));
    chai.request(app)
      .post('/api/v1/auth/forgot_password')
      .send(mockUser)
      .end((err, res) => {
        expect(res.status).to.equal(500);
        stub.restore();
        done();
      });
  });
});

describe('User reset password test', () => {
  let token = {};
  before(async () => {
    token = await mockToken();
  });

  it('should return an error when passed non-existing user', (done) => {
    chai.request(app)
      .post(`/api/v1/auth/reset_password/${token.invalidUserResetToken}`)
      .send({
        password: 'new-pass',
        confirmPassword: 'new-pass',
      })
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('User does not exist');
        done();
      });
  });
  it('should return an error when passed an invalid reset token', (done) => {
    chai.request(app)
      .post('/api/v1/auth/reset_password/rubbish123')
      .send({
        password: 'new-pass',
        confirmPassword: 'new-pass',
      })
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('User does not exist');
        done();
      });
  });
  it('should return an error when passed expired token', (done) => {
    chai.request(app)
      .post(`/api/v1/auth/reset_password/${token.invalidToken}`)
      .send({
        password: 'new-pass',
        confirmPassword: 'new-pass',
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('Expired reset link');
        done();
      });
  });
  it('should return an error when password is empty', (done) => {
    chai.request(app)
      .post(`/api/v1/auth/reset_password/${token.validUserResetToken}`)
      .send({
        password: '',
        confirmPassword: 'new-pass',
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('Validation Error!');
        expect(res.body.data.password).to.equal('Password is required');
        done();
      });
  });
  it('should return an error when password is less than 8 characters', (done) => {
    chai.request(app)
      .post(`/api/v1/auth/reset_password/${token.validUserResetToken}`)
      .send({
        password: '12345',
        confirmPassword: '12345',
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('Validation Error!');
        expect(res.body.data.password).to.equal('Password should be between 8 to 32 characters');
        done();
      });
  });
  it('should return an error when password is not equal to confirm-password', (done) => {
    chai.request(app)
      .post(`/api/v1/auth/reset_password/${token.validUserResetToken}`)
      .send({
        password: 'new-pass',
        confirmPassword: 'not-new-pass',
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('Validation Error!');
        expect(res.body.data.confirmPassword).to.equal('Password confirmation does not match password');
        done();
      });
  });
  it('should reset user password', (done) => {
    chai.request(app)
      .post(`/api/v1/auth/reset_password/${token.validUserResetToken}`)
      .send({
        password: 'new-pass',
        confirmPassword: 'new-pass',
      })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.success).to.equal(true);
        expect(res.body.message).to.equal('Password reset successful');
        done();
      });
  });
  it('should return an error when valid token is used more than once', (done) => {
    chai.request(app)
      .post(`/api/v1/auth/reset_password/${token.validUserResetToken}`)
      .send({
        password: 'new-pass',
        confirmPassword: 'new-pass',
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('Expired reset link');
        done();
      });
  });
  it('should return a 500 error when an error occurs on the server', (done) => {
    const stub = sinon.stub(User, 'findOne').rejects(new Error('Internal server error'));
    chai.request(app)
      .post(`/api/v1/auth/reset_password/${token.validUserResetToken}`)
      .send({
        password: 'new-pass',
        confirmPassword: 'new-pass',
      })
      .end((err, res) => {
        expect(res.status).to.equal(500);
        stub.restore();
        done();
      });
  });
});
