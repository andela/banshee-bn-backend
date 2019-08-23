import db from '../database/models';
import jwtHelper from '../helpers/Token';
import hashHelper from '../helpers/Hash';
import Response from '../helpers/Response';

const { User } = db;
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
        firstName, lastName, email, password, gender, dob
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
        companyId
      });

      const {
        id,
        role
      } = user;
      const token = jwtHelper.generateToken({
        id,
        email,
        role,
        companyId
      });
      const response = new Response(true, 200, 'User signup successfully', { user: { email, token } });
      return res.status(response.code).json(response);
    } catch (err) {
      const response = new Response(false, 500, 'Server error, Please try again later');
      return res.status(response.code).json(response);
    }
  }
}

export default Auth;
