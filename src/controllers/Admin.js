import Response from '../helpers/Response';
import db from '../database/models';

const { User } = db;

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
}

export default AdminController;
