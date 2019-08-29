import database from '../database/models';

const { User } = database;

/**
 * @class UserService
 */
class UserService {
  /**
   * @description method to find user in the database
   * @param {object} email request object containing user email
   * @returns {object} response object
   */
  static async getAUser(email) {
    const user = await User.findOne({
      where: { email },
    });
    return user;
  }

  /**
   * @description method to get user details by ID
   * @param {object} id user id
   * @returns {object} response object
   */
  static async getUserId(id) {
    const user = await User.findOne({
      where: { id },
    });
    return user;
  }
}

export default UserService;
