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
  static async requestTravel(req, res) {
    const { params: { id } } = req;
    try {
      const user = await UserService.getUserById(id);
      if (!user) {
        return res.status(404).json({ error: 'User not found!' });
      }
      if (user.role === 'staff') {
        return res.status(200).json(user);
      }

      const travelRequest = { ...req.body };

      // const travelData = await Trips.create({ });

      return res.status(403).json({
        status: 'User not authorized',
        data: travelRequest,
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

export default UserTrip;
