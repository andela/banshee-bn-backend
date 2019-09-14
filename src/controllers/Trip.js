import { Op } from 'sequelize';
import db from '../database/models';
import Response from '../helpers/Response';
import SearchDatabase from '../helpers/SearchDatabase';
import EmailNotifications from '../helpers/EmailNotifications';
import addNotification from '../helpers/addNotification';
import { inAppStyle } from '../helpers/template/styles';
import script from '../helpers/template/inAppScript';
import inAppHTMLContent from '../helpers/template/inAppContent';
import templateIndex from '../helpers/template/index';
import inAppBot from '../helpers/inAppBot';

const {
  Trip, Branch, User, Stop, Accomodation, Location
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
        attributes: {
          exclude: ['startBranchId', 'userId']
        },
        include: [
          {
            model: Stop,
            as: 'stop',
            attributes: ['id'],
            include: [{ model: Branch, as: 'branch', attributes: ['id', 'name'] },
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
      const { payload: { id: userId, email, companyId } } = req.payload;
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
      if (trip.id) {
        const admins = await SearchDatabase.findAdminUsersWithNotificationOpt(
          ['travel admin', 'manager'], { emailOpt: true }, { companyId }
        );
        const emails = admins.map((admin) => admin.email);
        if (emails) {
          const data = await SearchDatabase.findTrip(trip.id);
          const tripData = {
            type,
            reason,
            departureDate,
            returnDate
          };
          const message = `${data.user.firstName} ${data.user.lastName} requested for a ${type} trip`;
          const recipients = emails.includes(email) ? [...emails] : [...emails, email];
          data.trips = { ...data.trips, ...tripData };
          EmailNotifications.sendNewTrip(emails, message, data);
          inAppBot.send('New trip request', { message, recipients });
          await addNotification(trip.id, message, recipients);
          const response = new Response(
            true,
            201,
            'Travel request successfully created',
            { trip }
          );
          return res.status(response.code).json(response);
        }
      }
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
  * Get pending requests
  * Route: GET: /trips
  * @param {object} req - HTTP Request object
  * @param {object} res - HTTP Response object
  * @return {res} res - HTTP Response object
  * @memberof TripsController
  */
  static async getPendingRequests(req, res) {
    try {
      const { type } = req.query;
      const { payload: { companyId } } = req.payload;
      let trips;
      switch (type) {
        case 'pending':
          trips = await Trip.findAll({
            where: { status: 'pending' },
            include: [{
              model: User,
              as: 'user',
              attributes: {
                exclude: [
                  'id',
                  'firstName',
                  'lastName',
                  'dob',
                  'gender',
                  'email',
                  'password',
                  'role',
                  'status',
                  'companyId',
                  'favorites',
                  'createdAt',
                  'updatedAt'
                ]
              },
              where: { companyId }
            }],
          });
          break;
        case 'approved':
          trips = await Trip.findAll({
            where: { status: 'approved' },
            include: [{
              model: User,
              as: 'user',
              attributes: {
                exclude: [
                  'id',
                  'firstName',
                  'lastName',
                  'dob',
                  'gender',
                  'email',
                  'password',
                  'role',
                  'status',
                  'companyId',
                  'favorites',
                  'createdAt',
                  'updatedAt'
                ]
              },
              where: { companyId }
            }],
          });
          break;
        case 'rejected':
          trips = await Trip.findAll({
            where: { status: 'rejected' },
            include: [{
              model: User,
              as: 'user',
              attributes: {
                exclude: [
                  'id',
                  'firstName',
                  'lastName',
                  'dob',
                  'gender',
                  'email',
                  'password',
                  'role',
                  'status',
                  'companyId',
                  'favorites',
                  'createdAt',
                  'updatedAt'
                ]
              },
              where: { companyId }
            }],
          });
          break;
        default:
          trips = await Trip.findAll({
            include: [{
              model: User,
              as: 'user',
              attributes: {
                exclude: [
                  'id',
                  'firstName',
                  'lastName',
                  'dob',
                  'gender',
                  'email',
                  'password',
                  'role',
                  'status',
                  'companyId',
                  'favorites',
                  'createdAt',
                  'updatedAt'
                ]
              },
              where: { companyId }
            }],
          });
      }
      if (!trips.length) {
        const response = new Response(
          false, 404, 'No pending requests'
        );
        return res.status(response.code).json(response);
      }

      const response = new Response(
        true, 200, 'Requests retrieved', trips
      );
      return res.status(response.code).json(response);
    } catch (error) {
      const response = new Response(
        false, 500, 'Server error, Please try again later'
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

  /**
   * @description - method to retrieve a users favourites destinations
   * @param {object} req - HTTP request object
   * @param {object} res - HTTP response object
   * @returns {object} - object
   */
  static async getMostVisitedBranch(req, res) {
    const { companyId } = req.payload.payload;
    const userLocationBranches = [];
    const branchIds = [];

    try {
      // get the users branches
      const userBranches = await Location.findAll({
        where: { companyId },
        attributes: ['id'],
        include: [{
          model: Branch,
          as: 'branch',
          attributes: ['id'],
        }],
        raw: true
      });

      userBranches.forEach((element) => {
        userLocationBranches.push(element['branch.id']);
      });

      const mostVisitedBranches = await Stop.count({
        where: {
          destinationBranchId: {
            [Op.in]: userLocationBranches
          }
        },
        group: ['destinationBranchId'],
      });

      const orderByCount = mostVisitedBranches.sort((a, b) => b.count - a.count);
      const mostThreeVisitedBranches = orderByCount.slice(0, 3);

      mostThreeVisitedBranches.forEach((branch) => {
        branchIds.push(branch.destinationBranchId);
      });

      const branchesInfo = await Branch.findAll({
        where: {
          id: {
            [Op.in]: branchIds
          }
        },
        include: [{
          model: Location,
          as: 'location',
          attributes: ['country', 'city']
        }
        ],
        attributes: ['id', 'name']
      });
      return res.status(200).json(
        new Response(true, 200, 'Successfully retrieved company user\'s most travelled destinations', branchesInfo)
      );
    } catch (error) {
      return res.status(500).json(
        new Response(false, 500, error.message)
      );
    }
  }

  /**
 *
 * @param {req} req
 * @param {res} res
 * @return {object} object
 */
  static sendInAppPage(req, res) {
    const temp = templateIndex(inAppStyle, inAppHTMLContent, script);
    res.status(200).send(temp);
  }
}

export default TripController;
