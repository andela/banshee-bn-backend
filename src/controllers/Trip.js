import UserService from '../services/UserService';

/**
 * @class UserTrip
 */
class UserTrip {
  /**
   * @description saves user information on travel request
   * @param {object} req - the request
   * @param {object} res - the response
   * @returns {object} - user information
   */
  static async travelRequest(req, res) {
    // Check user table and find out if preference is saved or not
    const { id } = req.params;
    try {
      const user = await UserService.getUserId(id);
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json(error);
    }
    // if preference is checked, retrieve user's personal information

    // else
    //  ask for user details including the option to save (type: boolean)
  }
}

export default UserTrip;
