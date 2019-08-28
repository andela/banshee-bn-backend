import Response from '../helpers/Response';
import UserService from '../services/UserService';

/**
 * @class TripMiddleware
 */
class TripMiddleware {
  /**
   * @param {object} req - the request
   * @param {object} res - the response
   * @param {function} next
   * @returns {object} - user profile
   */
  static async getProfileInfo(req, res, next) {
    const { payload: { id } } = req.payload;

    try {
      const user = await UserService.getUserById(id);
      const {
        favorites, firstName, lastName, gender, role
      } = user.dataValues;

      if (favorites === true) {
        return next();
      }

      const userInfo = [firstName, lastName, gender, role];
      const response = new Response(
        true, 200, 'retrieved successfully', userInfo
      );
      return res.status(response.code).json(response);
    } catch (error) {
      const response = new Response(false, 500, error.message);
      return res.status(response.code).json(response);
    }
  }
}

export default TripMiddleware;
