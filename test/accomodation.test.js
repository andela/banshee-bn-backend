import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import app from '../src/index';
import jwtHelper from '../src/helpers/Token';
import users from './mockData/mockAuth';
import db from '../src/database/models';
import accomodation from './mockData/mockAccomodation';

const { expect } = chai;
chai.use(chaiHttp);
const baseUrl = '/api/v1/admin/accomodation';
const { Accomodation, Room } = db;
const { travelAdmin } = users;
const {
  accomodationWithWrongBranchId,
  accomodationWrongCompany, existingAccomodation, addRoom,
  roomWithWrongAccId, InvalidCharacterAcctn, accomodationComplete,
  addRoom1, roomInAnotherCompany, roomWithoutName, accdtnWithoutName
} = accomodation;

describe('Travel Admin Creates Accomodation', () => {
  describe('Create accomodation facility', () => {
    const token = jwtHelper.generateToken(travelAdmin);

    it('should create accomodation facility', (done) => {

      chai
        .request(app)
        .post(`${baseUrl}/create`)
        .send(accomodationComplete)
        .set('x-access-token', token)
        .end((err, res) => {
          expect(res.status).to.eq(201);
          expect(res.body.message).to.eq('Successfully created accomodation center');
          done();
        });
    });
    it('should return error if invalid branch is supplied', (done) => {

      chai
        .request(app)
        .post(`${baseUrl}/create`)
        .send(accomodationWithWrongBranchId)
        .set('x-access-token', token)
        .end((err, res) => {
          expect(res.status).to.eq(400);
          expect(res.body.message).to.eq('Validation Error!');
          expect(res.body.data.branchId).to.eq('Supplied branch is not found');
          done();
        });
    });
    it('should return error if unauthorized branchid is supplied', (done) => {

      chai
        .request(app)
        .post(`${baseUrl}/create`)
        .send(accomodationWrongCompany)
        .set('x-access-token', token)
        .end((err, res) => {
          expect(res.status).to.eq(400);
          expect(res.body.data.branchId).to.eq('You cannot create accomodation for other companies');
          expect(res.body.message).to.eq('Validation Error!');
          done();
        });
    });
    it('should return error if accomodation facility name is not supplied', (done) => {

      chai
        .request(app)
        .post(`${baseUrl}/create`)
        .send(accdtnWithoutName)
        .set('x-access-token', token)
        .end((err, res) => {
          expect(res.status).to.eq(400);
          expect(res.body.data.name).to.eq('Accomodation center name should be between 10 and 50 characters');
          done();
        });
    });
    it('should return error if a registered accomodation is sent', (done) => {

      chai
        .request(app)
        .post(`${baseUrl}/create`)
        .send(existingAccomodation)
        .set('x-access-token', token)
        .end((err, res) => {
          expect(res.status).to.eq(400);
          expect(res.body.message).to.eq('Validation Error!');
          expect(res.body.data.branchId).to.eq('Supplied accomodation is already registered');
          done();
        });
    });
    it('should return error 500 if there is server error', (done) => {

      const stub = sinon.stub(Accomodation, 'create')
        .rejects(new Error('There\'s error processing your request, try again'));

      chai
        .request(app)
        .post(`${baseUrl}/create`)
        .send(InvalidCharacterAcctn)
        .set('x-access-token', token)
        .end((err, res) => {
          expect(res.status).to.eq(500);
          expect(res.body.message).to.eq('There\'s error processing your request, try again');
          stub.restore();
          done();
        });
    });
  });

  describe('Add rooms to accomodation facility', () => {
    const token = jwtHelper.generateToken(travelAdmin);

    it('should create a new room', (done) => {

      chai
        .request(app)
        .post(`${baseUrl}/addroom`)
        .send(addRoom)
        .set('x-access-token', token)
        .end((err, res) => {
          expect(res.status).to.eq(200);
          expect(res.body.message).to.eq('Successfully added a room');
          done();
        });
    });
    it('should return error if accomodation is not found', (done) => {

      chai
        .request(app)
        .post(`${baseUrl}/addroom`)
        .send(roomWithWrongAccId)
        .set('x-access-token', token)
        .end((err, res) => {
          expect(res.status).to.eq(400);
          expect(res.body.data.accomodationId).to.eq('Supplied accomodation is not found');
          done();
        });
    });
    it('should return error if user attempts to add a room to another company\'s accomodation', (done) => {

      chai
        .request(app)
        .post(`${baseUrl}/addroom`)
        .send(roomInAnotherCompany)
        .set('x-access-token', token)
        .end((err, res) => {
          expect(res.status).to.eq(400);
          expect(res.body.data.accomodationId).to.eq('You cannot add rooms to other companies accomodation facilities');
          done();
        });
    });
    it('should return error if room is already registered', (done) => {

      chai
        .request(app)
        .post(`${baseUrl}/addroom`)
        .send(addRoom)
        .set('x-access-token', token)
        .end((err, res) => {
          expect(res.status).to.eq(400);
          expect(res.body.data.accomodationId).to.eq('Supplied room already registered');
          done();
        });
    });
    it('should return error if name of room is not supplied', (done) => {

      chai
        .request(app)
        .post(`${baseUrl}/addroom`)
        .send(roomWithoutName)
        .set('x-access-token', token)
        .end((err, res) => {
          expect(res.status).to.eq(400);
          expect(res.body.data.name).to.eq('Room name should be between 5 and 50 characters');
          done();
        });
    });
    it('should return error if number of rooms is equal to the capacity of the accomodation', (done) => {
      const stub = sinon.stub(Room, 'count')
        .returns(12);

      chai
        .request(app)
        .post(`${baseUrl}/addroom`)
        .send(addRoom1)
        .set('x-access-token', token)
        .end((err, res) => {
          expect(res.status).to.eq(400);
          expect(res.body.data.accomodationId).to.eq('Rooms cannot exceed the capacity of the accomodation facility');
          stub.restore();
          done();
        });
    });
    it('should return error if there is server error', (done) => {
      const stub = sinon.stub(Room, 'create')
        .rejects(new Error('There\'s error processing your request, try again'));

      chai
        .request(app)
        .post(`${baseUrl}/addroom`)
        .send(addRoom1)
        .set('x-access-token', token)
        .end((err, res) => {
          expect(res.status).to.eq(500);
          expect(res.body.message).to.eq('There\'s error processing your request, try again');
          stub.restore();
          done();
        });
    });
  });
});
