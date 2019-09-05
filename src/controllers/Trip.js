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
      const { payload: { id: userId } } = req.payload;
      const {
        type, from, departureDate, returnDate, destinations, reason
      } = req.body;

      const stops = destinations.map(({ to, accomodation }) => ({
        destinationBranchId: to,
        accomodationId: accomodation,
      }));

      const trip = await Trip.create(
        {
          type,
          userId,
          startBranchId: from,
          reason,
          tripDate: departureDate,
          returnDate: type === 'return' ? returnDate : null,
          stop: stops
        },
        {
          include: [
            {
              model: Stop,
              as: 'stop',
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

  /**
  * @description - this method update the status of a travel request
  * @param {object} req - the request sent to the router
  * @param {object} res  - the request sent back from the controller
  * @returns {object} - object
  */
  static async modifyTripRequestStatus(req, res) {
    const { status } = req.body;
    const { tripId } = req.params;
    const trip = await Trip.findOne({
      where: { id: tripId },
      returning: true
    });
    if (trip) {
      const updatedTrip = await trip.update({ status },
        {
          returning: true,
          plain: true,
          fields: ['status']
        });

      const response = new Response(
        true,
        200,
        `Trip ${status} successfully`,
        updatedTrip
      );
      return res.status(response.code).json(response);
    }
    const response = new Response(
      false,
      404,
      'Trip does not exist'
    );
    return res.status(response.code).json(response);
  }


  /**
   *
   * @param {object} req Request
   * @param {object} res Response
   * @returns {object} JSON
   */
  static async editTripRequest(req, res) {
    try {
      const { tripId } = req.params;
      const { payload: { id: userId } } = req.payload;
      const {
        from, departureDate, returnDate, destinations, reason
      } = req.body;
      // Check if trip exists
      const trip = await Trip.findOne(
        {
          where: { id: tripId, userId },
          raw: true
        }
      );
      if (!trip) {
        const response = new Response(false, 404, 'Trip does not exist');
        return res.status(response.code).json(response);
      }
      //  check if trip is still open
      if (trip.status !== 'pending') {
        const response = new Response(false, 403, 'This trip is no longer open');
        return res.status(response.code).json(response);
      }
      // update record in Trip table
      await Trip.update(
        {
          startBranchId: from,
          tripDate: departureDate,
          returnDate: trip.type === 'return' ? returnDate : null,
          reason,
        },
        { where: { id: tripId } }
      );

      // update records in Stops table
      if (destinations) {
        const modifiedDestinations = destinations.map((destination) => Stop.update(
          {
            destinationBranchId: destination.to,
            accomodationId: destination.accomodation,
          },
          { where: { id: destination.id }, returning: true, plain: true }
        ));
        await Promise.all(modifiedDestinations);
      }
      // Fetch trip to populate response body
      const updatedTrip = await Trip.findOne(
        {
          where: { id: tripId },
          include: [
            {
              model: Stop,
              as: 'stop',
              attributes: { exclude: ['tripId'] }
            },
          ],
          order: [[{ model: Stop, as: 'stop' }, 'createdAt', 'ASC']],
        }
      );
      const response = new Response(
        true,
        200,
        'Travel request successfully updated',
        { trip: updatedTrip }
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
