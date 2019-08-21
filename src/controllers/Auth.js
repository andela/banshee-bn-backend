import db from '../database/models';
import jwtHelper from '../helpers/Token';
import hashHelper from '../helpers/Hash';
import Response from '../helpers/Response';
import SearchDb from '../helpers/SearchDatabase';

const { User, Company } = db;
const { hashPassword } = hashHelper;

/** authentication controller class */
class Auth {
  /**
   * @description - this method creates user
   *
   * @param {object} req - the request sent to the router
   * @param {object} res  - the request sent back from the controller
   * @returns {object} - object
   */
  static async signup(req, res) {
    try {
      const {
        firstName,
        lastName,
        email,
        password,
        gender,
        dob
      } = req.body;
      const companyId = req.data;
      const hashedPassword = hashPassword(password);
      const user = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        gender,
        dob,
        companyId,
      });

      const { id, role } = user;
      const token = jwtHelper.generateToken({
        id,
        email,
        role,
        companyId,
      });

      const response = new Response(
        true,
        201,
        'User signup successfully',
        { user: { email, token } }
      );
      return res.status(response.code).json(response);
    } catch (err) {
      const response = new Response(
        false,
        500,
        'Server error, Please try again later',
      );
      return res.status(response.code).json(response);
    }
  }

  /**
   * @description - this method creates user
   *
   * @param {object} req - the request sent to the router
   * @param {object} res  - the request sent back from the controller
   * @returns {object} - object
   */
  static async companySignup(req, res) {
    try {
      const {
        firstName,
        lastName,
        email,
        password,
        gender,
        dob,
        companyName,
        address,
        code
      } = req.body;
      const hashedPassword = hashPassword(password);
      const company = await Company.create({
        name: companyName,
        address,
        code,
        owner: email
      });

      const user = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        gender,
        dob,
        companyId: company.id
      });

      await Company.update(
        { owner: user.id },
        { where: { id: company.id } }
      );

      const {
        id,
        role,
        companyId
      } = user;
      const token = jwtHelper.generateToken({
        id,
        email,
        role,
        companyId
      });
      const response = new Response(
        true,
        201,
        'User signup successfully',
        { user: { email, token } }
      );
      return res.status(response.code).json(response);
    } catch (err) {
      const response = new Response(
        false,
        500,
        'Server error, Please try again later'
      );
      return res.status(response.code).json(response);
    }
  }

  /**
   * @description - this method login user
   *
   * @param {object} req - the request sent to the router
   * @param {object} res  - the request sent back from the controller
   * @returns {object} - object
   */
  static async login(req, res) {
    const { email, password, code } = req.body;
    const company = await SearchDb.findCompany(code);
    const unauthorizedCode = 401;
    if (!company) {
      const response = new Response(
        false,
        unauthorizedCode,
        'Incorrect company code',
        {}
      );
      return res.status(response.code).json(response);
    }
    const companyId = company.id;
    const user = await User.findOne({ where: { email, companyId } });
    if (!user) {
      const response = new Response(
        false,
        unauthorizedCode,
        'Incorrect email or password',
        {}
      );
      return res.status(response.code).json(response);
    }
    const hash = user.password;
    const result = hashHelper.comparePassword(hash, password);
    if (result) {
      const {
        id, role
      } = user;
      const token = jwtHelper.generateToken({
        id,
        email,
        role,
        companyId
      });
      const response = new Response(
        true,
        200,
        'user logged in sucessfully',
        { user: { email, token }, }
      );
      return res.status(response.code).json(response);
    }
    const response = new Response(
      false,
      unauthorizedCode,
      'Incorrect email or password'
    );
    return res.status(response.code).json(response);
  }
}
export default Auth;
