import db from '../database/models';
import Response from '../helpers/Response';

const {
  Trip, Branch, User, Stop, Accomodation
} = db;

/**
 * Users' Request controller
 */
class TripController {
  /**
   * @description Get a user's travel requests
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {Object} Object
   */
  static async getUserTrips(req, res) {
    const { id } = req.payload.payload;
    try {
      const userTrips = await Trip.findAll({
        where: { userId: id },
        include: [
          {
            model: Stop,
            as: 'stop',
            attributes: ['destinationBranchId', 'accomodationId'],
            include: [{ model: Branch, as: 'branch', attributes: ['id', 'name', 'locationId'] },
            { model: Accomodation, as: 'accomodation', attributes: ['id', 'name', 'capacity', 'status'] }]
          },
          { model: User, as: 'user', attributes: ['firstName', 'lastName'] },
          { model: Branch, as: 'branch', attributes: ['name', 'locationId'] }
        ]
      });

      return res.status(200).send(new Response(true, 200, 'User requests successfully retrieved', userTrips));
    } catch (err) {
      return res.status(500).send(new Response(false, 500, err.message));
    }
  }

  /**
   *
   * @param {object} req Request
   * @param {object} res Response
   * @returns {object} JSON
   */
  static async createTripRequest(req, res) {
    try {
      const { payload } = req.payload;
      const { id: userId } = payload;
      const {
        type, from, departureDate, returnDate, destination, reason
      } = req.body;
      const { to, accomodation } = destination;

      const trip = await Trip.create(
        {
          type,
          userId,
          startBranchId: from,
          reason,
          tripDate: departureDate,
          returnDate: type === 'oneway' ? null : returnDate,
          stop: {
            destinationBranchId: to,
            accomodationId: accomodation,
          }
        },
        {
          include: [
            {
              model: Stop,
              as: 'stop'
            }
          ]
        }
      );
      const response = new Response(
        true,
        201,
        'Travel request successfully created',
        { trip }
      );
      return res.status(response.code).json(response);
    } catch (error) {
      const response = new Response(
        false,
        500,
        'Server error, Please try again later'
      );
      return res.status(response.code).json(response);
    }
  }
}

export default TripController;
