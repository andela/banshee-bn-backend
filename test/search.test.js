import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import app from '../src/index';
import models from '../src/database/models';
import mockUsers from './mockData/mockAuth';

chai.use(chaiHttp);
const { expect } = chai;
const baseUrl = '/api/v1/search';
const { credentials } = mockUsers;
const { Trip } = models;
let validUserToken;

describe('Search Functionality Tests', () => {
  before((done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(credentials)
      .end((err, res) => {
        const { token } = res.body.data.user;
        validUserToken = token;
        done();
      });
  });

  it('should return search by status results', (done) => {
    chai.request(app)
      .get(`${baseUrl}?keyword=rejected&filter=status`)
      .set('Authorization', validUserToken)
      .end((err, res) => {
        const { searchResults } = res.body.data;
        expect(res.status).to.eql(200);
        expect(searchResults).to.be.an('array');
        expect(searchResults.length).to.be.greaterThan(0);
        expect(searchResults[0].status).to.eql('rejected');
        done();
      });
  });
  it('should return search by date results', (done) => {
    chai.request(app)
      .get(`${baseUrl}?keyword=2019-09-01&filter=startDate`)
      .set('Authorization', validUserToken)
      .end((err, res) => {
        const { searchResults } = res.body.data;
        expect(res.status).to.eql(200);
        expect(searchResults).to.be.an('array');
        expect(searchResults.length).to.be.greaterThan(0);
        expect(new Date(searchResults[0].tripDate)).to.eql(new Date('2019-09-01'));
        done();
      });
  });
  it('should return search by origin results', (done) => {
    chai.request(app)
      .get(`${baseUrl}?keyword=ikeja&filter=origin`)
      .set('Authorization', validUserToken)
      .end((err, res) => {
        const { searchResults } = res.body.data;
        expect(res.status).to.eql(200);
        expect(searchResults).to.be.an('array');
        expect(searchResults.length).to.be.greaterThan(0);
        expect(searchResults[0].branch.name).to.eql('Ikeja');
        done();
      });
  });
  it('should return search by destination results', (done) => {
    chai.request(app)
      .get(`${baseUrl}?keyword=gwa&filter=destination`)
      .set('Authorization', validUserToken)
      .end((err, res) => {
        const { searchResults } = res.body.data;
        expect(res.status).to.eql(200);
        expect(searchResults).to.be.an('array');
        expect(searchResults.length).to.be.greaterThan(0);
        expect(searchResults[0].stop[0].branch.name).to.eql('Gwagwalada');
        done();
      });
  });
  it('should return search by duration results', (done) => {
    const [from, to, filter] = ['2019-08-29', new Date(), 'duration'];
    chai.request(app)
      .get(baseUrl)
      .query({ from, to, filter })
      .set('Authorization', validUserToken)
      .end((err, res) => {
        const { searchResults } = res.body.data;
        expect(res.status).to.eql(200);
        expect(searchResults).to.be.an('array');
        expect(searchResults.length).to.be.greaterThan(0);
        expect(new Date(searchResults[0].tripDate)).to.eql(new Date('2019-09-01'));
        done();
      });
  });
  it('should return search by duration results', (done) => {
    const filter = 'duration';
    chai.request(app)
      .get(baseUrl)
      .query({ filter })
      .set('Authorization', validUserToken)
      .end((err, res) => {
        const { searchResults } = res.body.data;
        expect(res.status).to.eql(200);
        expect(searchResults).to.be.an('array');
        done();
      });
  });
  it('should return search by owner results', (done) => {
    chai.request(app)
      .get(`${baseUrl}?keyword=baba`)
      .set('Authorization', validUserToken)
      .end((err, res) => {
        const { searchResults } = res.body.data;
        expect(res.status).to.eql(200);
        expect(searchResults).to.be.an('array');
        expect(searchResults.length).to.be.greaterThan(0);
        expect(searchResults[0].user.firstName).to.eql('Babatunde');
        done();
      });
  });
  it('should return search by type results', (done) => {
    chai.request(app)
      .get(`${baseUrl}?keyword=oneway&filter=type`)
      .set('Authorization', validUserToken)
      .end((err, res) => {
        const { searchResults } = res.body.data;
        expect(res.status).to.eql(200);
        expect(searchResults).to.be.an('array');
        expect(searchResults.length).to.be.greaterThan(0);
        expect(searchResults[0].type).to.eql('oneway');
        done();
      });
  });
  it('should return a 500 error when an error occurs on the server', (done) => {
    const stub = sinon.stub(Trip, 'findAll')
      .rejects(new Error('Server error, Please try again later'));
    chai.request(app)
      .get(`${baseUrl}?keyword=pending`)
      .set('Authorization', validUserToken)
      .end((err, res) => {
        expect(res.status).to.equal(500);
        stub.restore();
        done();
      });
  });
});
