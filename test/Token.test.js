import chai from 'chai';
import chaiHttp from 'chai-http';
import users from './mockData/mockAuth';
import Token from '../src/helpers/Token';

const { expect } = chai;
chai.use(chaiHttp);

const {
  completeLoginWithCode,
} = users;

describe('Authorization token', () => {
  describe('Generate authorization token', () => {
    it('Should generate authorization token', async () => {
      const res = await Token.generateToken(completeLoginWithCode);

      expect(res.length).to.be.greaterThan(32);
    });
    it('Should generate authorization token', async () => {
      const res = await Token.generateToken(completeLoginWithCode);

      expect(res.length).to.be.greaterThan(32);
    });
  });
});
