import Response from '../helpers/Response';
import db from '../database/models';

const { User, Location, Branch } = db;

/**
 * Admin settings controller
 */
class AdminController {
  /**
   *
   * @param {object} req - HTTP Request object
   * @param {object} res - HTTP Response object
   * @returns {object} object
   */
  static async updateUserRole(req, res) {
    const { email } = req.params;
    const { role } = req.body;

    try {
      const user = await User.findOne({ where: { email }, attributes: ['role', 'status'] });
      if (!user || user.dataValues.status !== 'active') {
        return res.status(404).json(
          new Response(false, 404, 'User not found')
        );
      }
      if (role === user.dataValues.role) {
        return res.status(400).json(
          new Response(false, 400, 'User role did not change')
        );
      }

      const updateRole = await User.update({
        role
      },
      {
        where: {
          email, status: 'active'
        },
        returning: true,
        plain: true
      });
      const data = updateRole[1].dataValues;
      const response = {
        id: data.id,
        companyId: data.companyId,
        firstName: data.firstName,
        lastName: data.lastName,
        role: data.role,
        email: data.email,
        status: data.status
      };
      return res.status(200).json(
        new Response(true, 200, 'User role successfully updated', response)
      );
    } catch (error) {
      return res.status(500).json(new Response(false, 500, error.message));
    }
  }

  /**
  * Get all users in the company
  * Route: GET: /user/all
  * @param {object} req - HTTP Request object
  * @param {object} res - HTTP Response object
  * @return {res} res - HTTP Response object
  * @memberof AdminController
  */
  static async getAllUsers(req, res) {
    const { payload: { companyId } } = req.payload;
    try {
      const users = await User.findAll({
        where: { companyId },
        attributes: {
          exclude: ['password']
        }
      });

      const response = new Response(true, 200, 'Users retrieved', users);
      return res.status(response.code).json(response);
    } catch (error) {
      const response = new Response(
        false, 500, 'Server error, Please try again later'
      );
      return res.status(response.code).json(response);
    }
  }

  /**
   * @description - method to create company locations
   * @param {object} req - HTTP request object
   * @param {object} res - HTTP response object
   * @returns {object} object
   */
  static async createCompanyLocation(req, res) {
    const { companyId } = req.payload.payload;
    const { country, city } = req.body;

    try {
      const { dataValues } = await Location.create({
        companyId,
        country,
        city
      });

      return res.status(201).json(
        new Response(true, 201, 'Company location created successfully', dataValues)
      );
    } catch (error) {
      return res.status(500).json(
        new Response(false, 500, error.message)
      );
    }
  }

  /**
   * @description - method to create company branches
   * @param {object} req - HTTP request object
   * @param {object} res - HTTP response object
   * @returns {object} object
   */
  static async createCompanyBranch(req, res) {
    const { name, locationId } = req.body;

    try {
      const { dataValues } = await Branch.create({
        name,
        locationId
      });

      return res.status(201).json(
        new Response(true, 201, 'Company branch created successfully', dataValues)
      );
    } catch (error) {
      return res.status(500).json(
        new Response(false, 500, error.message)
      );
    }
  }
}

export default AdminController;
