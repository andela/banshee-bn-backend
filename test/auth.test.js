import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src';
import users from './mockData/mockAuth';

const { expect } = chai;
chai.use(chaiHttp);

const baseURL = '/api/v1/auth';
const {
  invalidFirstname, undefinedFirstname,
  undefinedLastname, invalidLastname,
  invalidPassword, undefinedPassword,
  invalidEmail, user6,
  undefinedDOB, invalidDOB,
  undefinedGender, invalidGender,
  invalidCode,
  user1, user2, user3, user4, user5
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
});
