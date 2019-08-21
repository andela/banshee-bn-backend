import search from '../helpers/SearchDatabase';
import Response from '../helpers/Response';

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
      const response = new Response(false, 404, `Company with ${companyCode} does not exit, confirm company code`);
      return res.status(response.code).json(response);
    }
    const { id } = company;
    req.data = id;
    return next();
  }
}

export default AuthMiddlewares;
