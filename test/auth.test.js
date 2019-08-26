import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src';
import users from './mockData/mockAuth';

const { expect } = chai;
chai.use(chaiHttp);

const baseURI = '/api/v1/auth';
const {
  invalidFirstname, undefinedFirstname,
  undefinedLastname, invalidLastname,
  invalidPassword, undefinedPassword,
  invalidEmail, user,
  undefinedDOB, invalidDOB,
  undefinedGender, invalidGender,
  invalidCode
} = users;

describe('Auth Routes', () => {
  describe('Signup Route', () => {
    it(`should successfully post to ${baseURI}/signup`, (done) => {
      chai
        .request(app)
        .post(`${baseURI}/signup`)
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body.data.user).to.have.property('token');
          done(err);
        });
    });

    specify("error if user's email is already registered", (done) => {
      chai
        .request(app)
        .post(`${baseURI}/signup`)
        .send(user)
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
        .post(`${baseURI}/signup`)
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
        .post(`${baseURI}/signup`)
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
        .post(`${baseURI}/signup`)
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
        .post(`${baseURI}/signup`)
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
        .post(`${baseURI}/signup`)
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
        .post(`${baseURI}/signup`)
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
        .post(`${baseURI}/signup`)
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
        .post(`${baseURI}/signup`)
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
        .post(`${baseURI}/signup`)
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
        .post(`${baseURI}/signup`)
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
        .post(`${baseURI}/signup`)
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
        .post(`${baseURI}/signup`)
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
  });
});
