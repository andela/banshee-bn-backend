import chai from "chai";
import chaiHttp from "chai-http";
import app from "../src/index";
import users from "./mockData/mockAuth";

const { expect } = chai;
chai.use(chaiHttp);
const { staffAuth, adminAuth } = users;

describe("NOTIFICATION OPTION TEST", () => {
  it("should turn on email notification for admin user", done => {
    const { token } = adminAuth;
    chai
      .request(app)
      .patch(`/api/v1/notifications/email_opt`)
      .set({ authorization: `${token}` })
      .send({ emailOpt: true })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.data.email).to.equal('ogedengbe123@gmail.com');
        expect(res.body.data.emailOpt).to.equal(true);
        done();
      });
  });
  it('should turn off email notification for admin user', done => {
    const { token } = adminAuth;
    chai
      .request(app)
      .patch(`/api/v1/notifications/email_opt`)
      .set({ authorization: `${token}` })
      .send({ emailOpt: false })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("object");
        expect(res.body.data.email).to.equal('ogedengbe123@gmail.com');
        expect(res.body.data.emailOpt).to.equal(false);
        done();
      });
  });

  it('should modify turn email notification without emailOpt', done => {
    const { token } = adminAuth;
    chai
      .request(app)
      .patch(`/api/v1/notifications/email_opt`)
      .set({ authorization: `${token}` })
      .send({})
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.data.emailOpt).to.equal("Email option is required");
        done();
      });
  });
  it('should modify turn email notification without emailOpt', done => {
    const { token } = adminAuth;
    chai
      .request(app)
      .patch(`/api/v1/notifications/email_opt`)
      .set({ authorization: `${token}` })
      .send({emailOpt: 'trueggfgfsgf'})
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.data.emailOpt).to.equal(
          'Email option must be a boolean'
        );
        done();
      });
  });
  it("should turn on in-app notification for admin user", done => {
    const { token } = adminAuth;
    chai
      .request(app)
      .patch(`/api/v1/notifications/in_app_opt`)
      .set({ authorization: `${token}` })
      .send({ inAppOpt: true })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("object");
        expect(res.body.data.email).to.equal("ogedengbe123@gmail.com");
        expect(res.body.data.inAppOpt).to.equal(true);
        done();
      });
  });
  it("should turn off in-app notification for admin user", done => {
    const { token } = adminAuth;
    chai
      .request(app)
      .patch(`/api/v1/notifications/in_app_opt`)
      .set({ authorization: `${token}` })
      .send({ inAppOpt: false })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("object");
        expect(res.body.data.email).to.equal("ogedengbe123@gmail.com");
        expect(res.body.data.inAppOpt).to.equal(false);
        done();
      });
  });

  it("should not modify turn on notification without inAppOpt", done => {
    const { token } = adminAuth;
    chai
      .request(app)
      .patch(`/api/v1/notifications/in_app_opt`)
      .set({ authorization: `${token}` })
      .send({})
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.data.inAppOpt).to.equal("In App option is required");
        done();
      });
  });
  it("should not modify turn email notification with invalid inAppOpt", done => {
    const { token } = adminAuth;
    chai
      .request(app)
      .patch(`/api/v1/notifications/in_app_opt`)
      .set({ authorization: `${token}` })
      .send({ inAppOpt: 'trueggfgfsgf' })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.data.inAppOpt).to.equal(
          "In App option must be a boolean"
        );
        done();
      });
  });
});
