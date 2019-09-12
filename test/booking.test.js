import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import app from '../src/index';
import models from '../src/database/models';
import users from './mockData/mockAuth';
import bookings from './mockData/mockBooking';

const { expect } = chai;
chai.use(chaiHttp);

const baseURL = '/api/v1';

const { Booking } = models;
const { accomodationBookings } = bookings;
const { user10 } = users;

let validToken;

describe('Accomodation Booking', () => {
  describe('User post a request to book an accomodation', () => {
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
    it('should successfully book an accomodation', (done) => {
      chai
        .request(app)
        .post(`${baseURL}/user/accomodation/booking`)
        .send(accomodationBookings[0])
        .set('authorization', validToken)
        .end((err, res) => {
          expect(res).to.have.status(201);
          done();
        });
    });
    it('should return an error if room Id is not associated with the accomodation', (done) => {
      chai
        .request(app)
        .post(`${baseURL}/user/accomodation/booking`)
        .send(accomodationBookings[1])
        .set('authorization', validToken)
        .end((err, res) => {
          expect(res).to.have.status(403);
          expect(res.body).to.be.an('object');
          done(err);
        });
    });
    it('should return an error if accomodation Id is not supplied', (done) => {
      chai
        .request(app)
        .post(`${baseURL}/user/accomodation/booking`)
        .send(accomodationBookings[2])
        .set('authorization', validToken)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.eql('Validation Error!');
          expect(res.body.data.accomodationId).to.eql('Accomodation Id is required');
          done(err);
        });
    });
    it('should return an error if accomodation is filled up', (done) => {
      chai
        .request(app)
        .post(`${baseURL}/user/accomodation/booking`)
        .send(accomodationBookings[3])
        .set('authorization', validToken)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.eql('Validation Error!');
          expect(res.body.data.accomodationId).to.eql('Accomodation is filled up');
          done(err);
        });
    });
    it('should return an error if accomodation Id does not exits', (done) => {
      chai
        .request(app)
        .post(`${baseURL}/user/accomodation/booking`)
        .send(accomodationBookings[4])
        .set('authorization', validToken)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.eql('Validation Error!');
          expect(res.body.data.accomodationId).to.eql('Accomodation does not exist');
          done(err);
        });
    });
    it('should return an error if room Id is not supplied', (done) => {
      chai
        .request(app)
        .post(`${baseURL}/user/accomodation/booking`)
        .send(accomodationBookings[5])
        .set('authorization', validToken)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.eql('Validation Error!');
          expect(res.body.data.roomId).to.eql('Room Id is required');
          done(err);
        });
    });
    it('should return an error if room Id does not exist', (done) => {
      chai
        .request(app)
        .post(`${baseURL}/user/accomodation/booking`)
        .send(accomodationBookings[6])
        .set('authorization', validToken)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.eql('Validation Error!');
          expect(res.body.data.roomId).to.eql('Room does not exist');
          done(err);
        });
    });
    it('should return an error if room is already booked', (done) => {
      chai
        .request(app)
        .post(`${baseURL}/user/accomodation/booking`)
        .send(accomodationBookings[7])
        .set('authorization', validToken)
        .end((err, res) => {
          expect(res).to.have.status(403);
          expect(res.body).to.be.an('object');
          done(err);
        });
    });
    it('should return an error if booking date is not supplied', (done) => {
      chai
        .request(app)
        .post(`${baseURL}/user/accomodation/booking`)
        .send(accomodationBookings[8])
        .set('authorization', validToken)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          done(err);
        });
    });
    it('should return an error if trip Id is not supplied', (done) => {
      chai
        .request(app)
        .post(`${baseURL}/user/accomodation/booking`)
        .send(accomodationBookings[9])
        .set('authorization', validToken)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          done(err);
        });
    });
    it('should return an error if trip Id does not exist', (done) => {
      chai
        .request(app)
        .post(`${baseURL}/user/accomodation/booking`)
        .send(accomodationBookings[10])
        .set('authorization', validToken)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.eql('Validation Error!');
          expect(res.body.data.tripId).to.eql('Trip does not exist');
          done(err);
        });
    });
    it('should return an error if trip Id is not related to user', (done) => {
      chai
        .request(app)
        .post(`${baseURL}/user/accomodation/booking`)
        .send(accomodationBookings[11])
        .set('authorization', validToken)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          done(err);
        });
    });
    it('should return an error if trip Id is not approved', (done) => {
      chai
        .request(app)
        .post(`${baseURL}/user/accomodation/booking`)
        .send(accomodationBookings[12])
        .set('authorization', validToken)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.eql('Validation Error!');
          expect(res.body.data.tripId).to.eql('Your trip is awaiting approval');
          done(err);
        });
    });
    it('should return an error if date is not current', (done) => {
      chai
        .request(app)
        .post(`${baseURL}/user/accomodation/booking`)
        .send(accomodationBookings[13])
        .set('authorization', validToken)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.eql('Validation Error!');
          expect(res.body.data.bookDate).to.eql('Invalid date, you can not select a day that as occured');
          done(err);
        });
    });
    it('should return a 500 error when an error occurs on the server', (done) => {
      const stub = sinon.stub(Booking, 'create')
        .rejects(new Error('Server error, Please try again later'));
      chai.request(app)
        .post(`${baseURL}/user/accomodation/booking`)
        .send(accomodationBookings[14])
        .set('authorization', validToken)
        .end((err, res) => {
          expect(res.status).to.equal(500);
          stub.restore();
          done();
        });
    });
  });
});
