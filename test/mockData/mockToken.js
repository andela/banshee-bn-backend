import models from '../../src/database/models';
import mockUsers from './mockAuth';
import tokenHelper from '../../src/helpers/Token';

const { User } = models;
const { user7: mockUser } = mockUsers;

const mockToken = async () => {
  const invalidUserId = '35a55c62-6c91-4c1c-af76-f7a3f7a7952e';
  const { dataValues: user } = await User.findOne({ where: { email: mockUser.email } });
  const { id: userId, password: secret } = user;
  const validUserResetToken = tokenHelper.generateToken({ userId }, secret, '1h');
  const invalidUserResetToken = tokenHelper.generateToken({ userId: invalidUserId }, secret, '1h');
  const invalidToken = tokenHelper.generateToken({ userId }, 'fake-secret', '1h');
  return {
    validUserResetToken,
    invalidUserResetToken,
    invalidToken
  };
};

export default mockToken;
