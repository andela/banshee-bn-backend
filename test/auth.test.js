import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import app from '../src/index';
import models from '../src/database/models';
import jwtHelper from '../src/helpers/Token';
import users from './mockData/mockAuth';

const { expect } = chai;
chai.use(chaiHttp);

const baseURL = '/api/v1/auth';
const { User } = models;
const {
  invalidFirstname, undefinedFirstname,
  undefinedLastname, invalidLastname,
  invalidPassword, undefinedPassword,
  invalidEmail, user6, user8,
  undefinedDOB, invalidDOB,
  undefinedGender, invalidGender,
  invalidCode, user1, user2,
  user3, user4, user5, credentials,
  credentialsWithIncorrectCode, credentialsWithIncorrectPassword,
  credentialsWithIncorrectEmail, credentialsWithoutEmail,
  credentialsWithoutCode, credentialsWithInvalidEmail,
  completeLoginWithCode, completeLoginWithoutCode,
  loginWithWrongCompanyId, credentialsWithInvalidEmail2,
  credentialsForServerError, credentialsForServerError2
} = users;

describe('Auth Routes', () => {
  describe('SIGNUP CONTROLLER TEST', () => {
    it(`should successfully post to ${baseURL}/register/user`, (done) => {
      chai
        .request(app)
        .post(`${baseURL}/register/user`)
        .send(user6)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body.data.user).to.have.property('token');
          done(err);
        });
    });
    specify("error if user's email is already registered", (done) => {
      chai
        .request(app)
        .post(`${baseURL}/register/user`)
        .send(user6)
        .end((err, res) => {
          expect(res).to.have.status(409);
          expect(res.body.message).to.eql(
            'User with email address already exist',
          );
          done(err);
        });
    });

    specify('error if companyCode supplied is invalid', (done) => {
      chai
        .request(app)
        .post(`${baseURL}/register/user`)
        .send(invalidCode)
        .end((err, res) => {
          expect(res).to.have.status(404);
          done(err);
        });
    });
  });
  describe('Signup route validation', () => {
    specify('error if FirstName is undefined (not provided)', (done) => {
      chai
        .request(app)
        .post(`${baseURL}/register/user`)
        .send(undefinedFirstname)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.message).to.eql('Validation Error!');
          expect(res.body.data.firstName).to.eql(
            'First name should be between 2 to 15 characters'
          );
          done(err);
        });
    });

    specify('error if FirstName is invalid', (done) => {
      chai
        .request(app)
        .post(`${baseURL}/register/user`)
        .send(invalidFirstname)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.message).to.eql('Validation Error!');
          expect(res.body.data.firstName).to.eql(
            'First name should only contain alphabets'
          );
          done(err);
        });
    });

    specify('error if LastName is undefined (not provided)', (done) => {
      chai
        .request(app)
        .post(`${baseURL}/register/user`)
        .send(undefinedLastname)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.message).to.eql('Validation Error!');
          expect(res.body.data.lastName).to.eql(
            'Last name should be between 2 to 15 characters'
          );
          done(err);
        });
    });

    specify('error if LastName is invalid', (done) => {
      chai
        .request(app)
        .post(`${baseURL}/register/user`)
        .send(invalidLastname)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.message).to.eql('Validation Error!');
          expect(res.body.data.lastName).to.eql(
            'Last name should only contain alphabets'
          );
          done(err);
        });
    });

    specify('error if email is invalid', (done) => {
      chai
        .request(app)
        .post(`${baseURL}/register/user`)
        .send(invalidEmail)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.message).to.eql('Validation Error!');
          expect(res.body.data.email).to.eql(
            'Email address is invalid'
          );
          done(err);
        });
    });

    specify('error if password is invalid or less than minimum length', (done) => {
      chai
        .request(app)
        .post(`${baseURL}/register/user`)
        .send(invalidPassword)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.message).to.eql('Validation Error!');
          expect(res.body.data.password).to.eql(
            'Password must be alphanumeric and not be less than 8 characters'
          );
          done(err);
        });
    });

    specify('error if password is undefined (not provided)', (done) => {
      chai
        .request(app)
        .post(`${baseURL}/register/user`)
        .send(undefinedPassword)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.message).to.eql('Validation Error!');
          expect(res.body.data.password).to.eql(
            'Password must be alphanumeric and not be less than 8 characters'
          );
          done(err);
        });
    });

    specify('error if DOB is undefined (not provided)', (done) => {
      chai
        .request(app)
        .post(`${baseURL}/register/user`)
        .send(undefinedDOB)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.message).to.eql('Validation Error!');
          expect(res.body.data.dob).to.eql(
            "Date must be of the format 'yyyy-mm-dd'"
          );
          done(err);
        });
    });

    specify('error if DOB is invalid', (done) => {
      chai
        .request(app)
        .post(`${baseURL}/register/user`)
        .send(invalidDOB)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.message).to.eql('Validation Error!');
          expect(res.body.data.dob).to.eql(
            'Users must be 18 and above'
          );
          done(err);
        });
    });

    specify('error if gender is undefined (not provided)', (done) => {
      chai
        .request(app)
        .post(`${baseURL}/register/user`)
        .send(undefinedGender)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.message).to.eql('Validation Error!');
          expect(res.body.data.gender).to.eql(
            'Male or Female is the accepted value'
          );
          done(err);
        });
    });

    specify('error if gender provided is invalid', (done) => {
      chai
        .request(app)
        .post(`${baseURL}/register/user`)
        .send(invalidGender)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.message).to.eql('Validation Error!');
          expect(res.body.data.gender).to.eql(
            'Male or Female is the accepted value'
          );
          done(err);
        });
    });
    it('User Signup - should return a token on successful registration', (done) => {
      chai
        .request(app)
        .post(`${baseURL}/register/user`)
        .send(user1)
        .end((err, res) => {
          const { user } = res.body.data;
          expect(res).to.have.status(201);
          expect(res.body).to.be.an('object');
          expect(user).to.be.a('object');
          expect(user).to.have.keys('email', 'token');
          done();
        });
    });
    it('User Signup - should return a token on successful registration', (done) => {
      chai
        .request(app)
        .post(`${baseURL}/register/user`)
        .send(user2)
        .end((err, res) => {
          const { user } = res.body.data;
          expect(res).to.have.status(201);
          expect(res.body).to.be.an('object');
          expect(user).to.be.a('object');
          expect(user).to.have.keys('email', 'token');
          done();
        });
    });
    it('User Signup - should return a error if User company code is invalid', (done) => {
      chai
        .request(app)
        .post(`${baseURL}/register/user`)
        .send(user4)
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });
    it('Company Signup - should return a token on successful signup registration', (done) => {
      chai
        .request(app)
        .post(`${baseURL}/register/company`)
        .send(user5)
        .end((err, res) => {
          const { user } = res.body.data;
          expect(res).to.have.status(201);
          expect(res.body).to.be.an('object');
          expect(user).to.be.a('object');
          expect(user).to.have.keys('email', 'token');
          done();
        });
    });
    it('Company Signup - should return a token on successful signup registration', (done) => {
      chai
        .request(app)
        .post(`${baseURL}/register/company`)
        .send(user5)
        .end((err, res) => {
          expect(res).to.have.status(409);
          done();
        });
    });
    it('Company Signup - should return a token on successful signup registration', (done) => {
      chai
        .request(app)
        .post(`${baseURL}/register/company`)
        .send(user8)
        .end((err, res) => {
          expect(res).to.have.status(409);
          done();
        });
    });
    it('Company Signup - should return a db error', (done) => {
      chai
        .request(app)
        .post(`${baseURL}/register/company`)
        .send(user3)
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
  });
  it('should return a 500 error when an error occurs on the server', (done) => {
    const stub = sinon.stub(User, 'create')
      .rejects(new Error('Server error, Please try again later'));
    chai.request(app)
      .post(`${baseURL}/register/company`)
      .send(credentialsForServerError)
      .end((err, res) => {
        expect(res.status).to.equal(500);
        stub.restore();
        done();
      });
  });
  it('should return a 500 error when an error occurs on the server', (done) => {
    const stub = sinon.stub(User, 'create')
      .rejects(new Error('Server error, Please try again later'));
    chai.request(app)
      .post(`${baseURL}/register/user`)
      .send(credentialsForServerError2)
      .end((err, res) => {
        expect(res.status).to.equal(500);
        stub.restore();
        done();
      });
  });
  describe('User Login', () => {
    it('should login with correct email, password and company code', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/login')
        .send(credentials)
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.body.code).to.equal(200);
          expect(res.body.message).to.equal('user logged in sucessfully');
          done(err);
        });
    });
    it('should not login with incorrect company code', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/login')
        .send(credentialsWithIncorrectCode)
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.body.code).to.equal(401);
          expect(res.body.message).to.equal('Incorrect company code');
          done(err);
        });
    });
    it('should not login user if password is incorrect', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/login')
        .send(credentialsWithIncorrectPassword)
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.body.code).to.equal(401);
          expect(res.body.message).to.equal('Incorrect email or password');
          done(err);
        });
    });
    it('should not login if email is incorrect', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/login')
        .send(credentialsWithIncorrectEmail)
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.body.code).to.equal(401);
          expect(res.body.message).to.equal('Incorrect email or password');
          done(err);
        });
    });
    it('should not login without email', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/login')
        .send(credentialsWithoutEmail)
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.status).to.equal(400);
          expect(res.body.data.email).to.equal('Email is required');
          done(err);
        });
    });
    it('should not login if email is empty', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/login')
        .send(credentialsWithInvalidEmail)
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.status).to.equal(400);
          expect(res.body.data.email).to.equal('Email must not be empty');
          done(err);
        });
    });
    it('should not login if email is invalid', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/login')
        .send(credentialsWithInvalidEmail2)
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.status).to.equal(400);
          expect(res.body.data.email).to.equal('Must be an email address');
          done(err);
        });
    });
    it('should not login without invalid company code', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/login')
        .send(credentialsWithoutCode)
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.status).to.equal(400);
          expect(res.body.data.code).to.equal('Company code is required');
          done(err);
        });
    });
  });

  describe('login user with details from social account and code', () => {
    it('should successfully login in user with company code and social account details ', (done) => {
      chai
        .request(app)
        .post(`${baseURL}/code`)
        .send(completeLoginWithCode)
        .end((err, res) => {
          expect(res.status).to.eq(200);
          expect(res.body.message).to.eq('login successful');
          expect(res.body.data).to.have.property('token');
          done();
        });
    });

    it('should return error if user is not registered', (done) => {
      chai
        .request(app)
        .post(`${baseURL}/code`)
        .send(loginWithWrongCompanyId)
        .end((err, res) => {
          expect(res.status).to.eq(400);
          expect(res.body.message).to.eq('Validation Error!');
          done();
        });
    });

    specify('error if company code is not supplied ', (done) => {
      chai
        .request(app)
        .post(`${baseURL}/code`)
        .send(completeLoginWithoutCode)
        .end((err, res) => {
          expect(res.status).to.eq(400);
          expect(res.body.message).to.eq('Validation Error!');
          expect(res.body.data.code).to.eq('Invalid company login code');
          done();
        });
    });
  });
});

describe('EMAIL VERIFICATION TEST', () => {
  const token = jwtHelper.generateToken({ email: 'mrtest@gmail.com' });
  it('should verify a user', (done) => {
    chai
      .request(app)
      .patch(`${baseURL}/verify?token=${token}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.key('success', 'code', 'message');
        done();
      });
  });
  it('should return an error message if a user is verified', (done) => {
    chai
      .request(app)
      .patch(`${baseURL}/verify?token=${token}`)
      .end((err, res) => {
        const { message } = res.body;
        expect(res).to.have.status(403);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.keys('success', 'code', 'message');
        expect(message).to.be.equal('Your account has already been verified');
        done();
      });
  });
  it('should return an error message if token is missing', (done) => {
    chai
      .request(app)
      .patch(`${baseURL}/verify?token=`)
      .end((err, res) => {
        const { message } = res.body;
        expect(res).to.have.status(401);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.keys('success', 'code', 'message');
        expect(message).to.be.equal('Unathorized, You did not provide a token');
        done();
      });
  });
  it('should return an error message if token is invalid', (done) => {
    chai
      .request(app)
      .patch(`${baseURL}/verify?token=28282328329dwdsd`)
      .end((err, res) => {
        const { message } = res.body;
        expect(res).to.have.status(401);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.keys('success', 'code', 'message');
        expect(message).to.be.equal('Unathorized, Your token is invalid or expired');
        done();
      });
  });
});
