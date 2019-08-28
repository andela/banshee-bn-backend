import search from '../helpers/SearchDatabase';
import Response from '../helpers/Response';
import UserService from '../services/UserService';

const { findCompany } = search;

/** Auth Middleware Class */
class AuthMiddlewares {
  /**
   * @param {object} req - the request
   * @param {object} res - the response
   * @param {function} next
   * @returns {object} - error
   */
  static async signUpValidator(req, res, next) {
    const { companyCode } = req.body;
    const company = await findCompany(companyCode);
    if (!company) {
      const response = new Response(
        false,
        404,
        `Company with ${companyCode} does not exist, confirm company code`
      );
      return res.status(response.code).json(response);
    }

    const { id } = company;
    req.data = id;
    return next();
  }

  /**
   *
   * @param {object} req request object
   * @param {object} res response object
   * @param {function} next
   * @returns {void}
   */
  static async checkExistingUser(req, res, next) {
    const { email } = req.body;
    const existingUser = await UserService.getAUser(email);

    if (existingUser) {
      const response = new Response(
        false,
        409,
        'User with email address already exist'
      );
      return res.status(response.code).json(response);
    }

    return next();
  }

  /**
   *
   * @param {object} req request object
   * @param {object} res response object
   * @param {function} next
   * @returns {void}
   */
  static async checkExistingCompany(req, res, next) {
    const { code } = req.body;
    const existingCompany = await findCompany(code);

    if (existingCompany) {
      const response = new Response(
        false,
        409,
        `Company with code: ${code} already exist`
      );
      return res.status(response.code).json(response);
    }

    return next();
  }
}

export default AuthMiddlewares;
