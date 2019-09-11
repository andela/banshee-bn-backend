import { Op, Sequelize } from 'sequelize';
import Pagination from '../helpers/Pagination';
import Response from '../helpers/Response';
import models from '../database/models';

const {
  Trip, User, Stop, Branch
} = models;
const {
  where, cast, col
} = Sequelize;
const { paginate } = Pagination;

/**
 * @class SearchController
 */
class SearchController {
  /**
   *
   * @param {object} req Request
   * @param {object} res Response
   * @returns {object} JSON
   */
  static async search(req, res) {
    try {
      const { payload } = req.payload;
      const { id: userId, companyId, role } = payload;
      const {
        keyword, from, to, filter, page, limit
      } = req.query;
      const pagination = paginate(page, limit);
      const userProtected = role !== 'manager' ? { userId } : null;

      let result;
      switch (filter) {
        case 'status':
          result = await Trip.findAll({
            where: {
              [Op.and]: [
                where(
                  cast(col('Trip.status'), 'varchar'),
                  { [Op.iLike]: `%${keyword}%` }
                ),
                userProtected
              ]
            },
            include: [
              {
                model: User,
                as: 'user',
                attributes: { exclude: ['id', 'password'] },
                where: { companyId }
              }
            ],
            offset: pagination.offset,
            limit: pagination.limit,
          });
          break;
        case 'startDate': {
          const startDate = new Date(keyword);
          result = await Trip.findAll({
            where: {
              [Op.and]: [
                { tripDate: startDate.toString() !== 'Invalid Date' ? startDate : null },
                userProtected
              ]
            },
            include: [
              {
                model: User,
                as: 'user',
                attributes: { exclude: ['id', 'password'] },
                where: { companyId }
              }
            ],
            offset: pagination.offset,
            limit: pagination.limit,
          });
        }
          break;
        case 'origin':
          result = await Trip.findAll({
            where: userProtected,
            include: [
              {
                model: Branch,
                as: 'branch',
                where: {
                  name: {
                    [Op.iLike]: `%${keyword}%`
                  }
                }
              },
              {
                model: User,
                as: 'user',
                attributes: { exclude: ['id', 'password'] },
                where: { companyId }
              }
            ],
            offset: pagination.offset,
            limit: pagination.limit,
          });
          break;
        case 'destination':
          result = await Trip.findAll({
            where: userProtected,
            include: [
              {
                model: Stop,
                as: 'stop',
                include: [
                  {
                    model: Branch,
                    as: 'branch',
                    where: {
                      name: {
                        [Op.iLike]: `%${keyword}%`
                      }
                    }
                  }
                ]
              },
              {
                model: User,
                as: 'user',
                attributes: { exclude: ['id', 'password'] },
                where: { companyId }
              }
            ],
            offset: pagination.offset,
            limit: pagination.limit,
          });
          break;
        case 'duration':
          result = await Trip.findAll({
            where: {
              [Op.and]: [
                {
                  createdAt: {
                    [Op.between]: [
                      !from ? new Date() : new Date(from),
                      !to ? new Date() : new Date(to)
                    ]
                  }
                },
                userProtected
              ]
            },
            include: [
              {
                model: User,
                as: 'user',
                attributes: { exclude: ['id', 'password'] },
                where: { companyId }
              }
            ],
            offset: pagination.offset,
            limit: pagination.limit,
          });
          break;
        case 'type':
          result = await Trip.findAll({
            where: {
              [Op.and]: [
                where(
                  cast(col('Trip.type'), 'varchar'),
                  { [Op.iLike]: `%${keyword}%` }
                ),
                userProtected
              ]
            },
            include: [
              {
                model: User,
                as: 'user',
                attributes: { exclude: ['id', 'password'] },
                where: { companyId }
              }
            ],
            offset: pagination.offset,
            limit: pagination.limit,
          });
          break;
        default:
          result = await Trip.findAll({
            where: userProtected,
            include: [
              {
                model: User,
                as: 'user',
                attributes: { exclude: ['id', 'password'] },
                where: {
                  [Op.and]: [
                    { companyId },
                    {
                      [Op.or]: [
                        { firstName: { [Op.iLike]: `%${keyword}%` } },
                        { lastName: { [Op.iLike]: `%${keyword}%` } }
                      ]
                    }
                  ]
                }
              }
            ],
            offset: pagination.offset,
            limit: pagination.limit,
          });
      }

      const response = new Response(
        true,
        200,
        'Search results',
        { searchResults: result }
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

export default SearchController;
