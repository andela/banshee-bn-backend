import models from '../database/models';
import Response from '../helpers/Response';
import hashHelper from '../helpers/Hash';
import jwtHelper from '../helpers/Token';

const { Supplier } = models;
/**
 * @class Supplier
 */
class SupplierController {
  /**
   *
   * @param {object} req Request
   * @param {object} res Response
   * @returns {object} JSON
   */
  static async addSupplier(req, res) {
    try {
      const { payload } = req.payload;
      const { companyId, id: managerId } = payload;
      const {
        firstName, lastName, email, password
      } = req.body;
      const supplier = await Supplier.findOne({ where: { email } });
      if (supplier) {
        const response = new Response(
          false,
          400,
          'Supplier with this email exists'
        );
        return res.status(400).json(response);
      }
      const newSupplier = await Supplier.create(
        {
          firstName,
          lastName,
          email,
          password: hashHelper.hashPassword(password),
          companyId,
          managerId
        }
      );
      const response = new Response(
        true,
        201,
        'Supplier successfully added',
        { supplier: { email: newSupplier.email } }
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
   *
   * @param {object} req Request
   * @param {object} res Response
   * @returns {object} JSON
   */
  static async supplierLogin(req, res) {
    try {
      const { email, password } = req.body;
      const supplier = await Supplier.findOne({ where: { email } });
      if (!supplier) {
        const response = new Response(false, 400, 'Incorrect email or password');
        return res.status(response.code).json(response);
      }
      if (!hashHelper.comparePassword(supplier.password, password)) {
        const response = new Response(false, 400, 'Incorrect email or password');
        return res.status(response.code).json(response);
      }
      const { id, companyId } = supplier;
      const token = jwtHelper.generateToken({
        id,
        companyId,
        email,
        role: 'supplier'
      });
      const response = new Response(
        true,
        200,
        'Login succesful',
        { supplier: { token } }
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

export default SupplierController;
