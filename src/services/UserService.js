import database from '../database/models';

const { User } = database;

/**
 * @class UserService
 */
class UserService {
  /**
   * @description method to find user in the database
   * @param {object} id request object containing user email
   * @returns {object} response object
   */
  static async getUserById(id) {
    const user = await User.findOne({
      where: { id },
    });
    return user;
  }
}

export default UserService;
