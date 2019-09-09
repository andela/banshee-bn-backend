import Sequelize from 'sequelize';
import db from '../database/models';

const {
  Company, Branch, User, Stop, Accomodation, Location, Trip
} = db;
const { Op } = Sequelize;

/** Search Database Class */
class SearchDatabase {
  /**
   *
   * @param {string} code
   * @return {object} object
   */
  static async findCompany(code) {
    const company = await Company.findOne({ where: { code } });
    return company;
  }

  /**
*
* @param {array} roles
* @param {object} NotificationOpt
* @param {object} company
* @return {object} object
*/
  static async findAdminUsersWithNotificationOpt(roles, NotificationOpt, company) {
    const admins = await User.findAll(
      {
        where: {
          ...NotificationOpt,
          ...company,
          role: { [Op.in]: [...roles] },
        },
        attributes: ['email']
      }
    );
    return admins;
  }

  /**
 *
 * @param {string} tripId
 * @return {object} object
 */
  static async findTrip(tripId) {
    try {
      const trip = await Trip.findAll({
        where: { id: tripId },
        attributes: ['id'],

        include: [
          {
            model: User, as: 'user', attributes: ['firstName', 'lastName', 'email'],
          },
          {
            model: Branch,
            as: 'branch',
            attributes: ['name'],
            include: [
              { model: Location, as: 'location', attributes: ['country', 'city'] }
            ]
          },
          {
            model: Stop,
            as: 'stop',
            attributes: ['id'],
            include: [
              {
                model: Branch,
                as: 'branch',
                attributes: ['name'],
                include: [
                  { model: Location, as: 'location', attributes: ['country', 'city'] }
                ]
              },
              { model: Accomodation, as: 'accomodation', attributes: ['name'] }
            ]
          },
        ],
        plain: true
      });
      const data = {
        user: trip.user,
        startLocation: trip.branch,
        destinations: trip.stop
      };
      return data;
    } catch (err) {
      return err.message;
    }
  }
}

export default SearchDatabase;
