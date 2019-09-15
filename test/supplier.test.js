import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import app from '../src/index';
import model from '../src/database/models';
import mockUser from './mockData/mockAuth';
import { supplier, accomodation } from './mockData/mockSupplier';

chai.use(chaiHttp);
const { expect } = chai;
const { admin: travelAdmin } = mockUser;
const { Supplier } = model;
let travelAdminToken, supplierToken;

describe('Travel admin add supplier', () => {
  before((done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(travelAdmin)
      .end((err, res) => {
        const { token } = res.body.data.user;
        travelAdminToken = token;
        done();
      });
  });
  it('should successfully add a supplier', (done) => {
    chai.request(app)
      .post('/api/v1/supplier/add')
      .send(supplier[0])
      .set('Authorization', travelAdminToken)
      .end((err, res) => {
        expect(res.status).to.eql(201);
        expect(res.body.data).to.haveOwnProperty('supplier');
        expect(res.body.data.supplier.email).to.eql(supplier[0].email);
        done();
      });
  });
  it('should return an error if supplier already exists', (done) => {
    chai.request(app)
      .post('/api/v1/supplier/add')
      .send(supplier[0])
      .set('Authorization', travelAdminToken)
      .end((err, res) => {
        expect(res.status).to.eql(400);
        expect(res.body.message).to.eql('Supplier with this email exists');
        done();
      });
  });
  it('should return a 500 error when an error occurs on the server', (done) => {
    const stub = sinon.stub(Supplier, 'findOne')
      .rejects(new Error('Server error, Please try again later'));
    chai.request(app)
      .post('/api/v1/supplier/add')
      .send(supplier[0])
      .set('Authorization', travelAdminToken)
      .end((err, res) => {
        expect(res.status).to.equal(500);
        stub.restore();
        done();
      });
  });
});

describe('Supplier Login', () => {
  it('should successfully login a supplier', (done) => {
    chai.request(app)
      .post('/api/v1/supplier/login')
      .send(supplier[0])
      .end((err, res) => {
        const { token } = res.body.data.supplier;
        supplierToken = token;
        expect(res.status).to.eql(200);
        expect(res.body.data).to.haveOwnProperty('supplier');
        done();
      });
  });
  it('should return an error when passed an invalid email', (done) => {
    chai.request(app)
      .post('/api/v1/supplier/login')
      .send(supplier[1])
      .end((err, res) => {
        expect(res.status).to.eql(400);
        expect(res.body.message).to.eql('Incorrect email or password');
        done();
      });
  });
  it('should return an error when passed invalid password', (done) => {
    chai.request(app)
      .post('/api/v1/supplier/login')
      .send(supplier[2])
      .end((err, res) => {
        expect(res.status).to.eql(400);
        expect(res.body.message).to.eql('Incorrect email or password');
        done();
      });
  });
  it('should return a 500 error when an error occurs on the server', (done) => {
    const stub = sinon.stub(Supplier, 'findOne')
      .rejects(new Error('Server error, Please try again later'));
    chai.request(app)
      .post('/api/v1/supplier/login')
      .send(supplier[0])
      .end((err, res) => {
        expect(res.status).to.equal(500);
        stub.restore();
        done();
      });
  });
});

describe('Supplier create accomodation', () => {
  it('should create an accomodation facility', (done) => {
    chai.request(app)
      .post('/api/v1/admin/accomodation/create')
      .send(accomodation)
      .set('Authorization', supplierToken)
      .end((err, res) => {
        const { data } = res.body;
        expect(res.status).to.eql(200);
        expect(data.description).to.eql(accomodation.description);
        expect(data.addOns).to.eql(accomodation.addOns);
        expect(data.amenities).to.eql(accomodation.amenities);
        done();
      });
  });
});
