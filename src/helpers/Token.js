import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Response from './Response';

dotenv.config();
const envSecret = process.env.TOKEN_SECRET;

/** Token Helper Class */
class Token {
  /**
   * @description - this method encodes a token
   * @param {object} payload
   * @param {string} secret
   * @param {string} expires
   * @return {string} token
   */
  static generateToken(payload, secret = envSecret, expires = '24h') {
    const token = jwt.sign({ payload }, secret, { expiresIn: expires });
    return token;
  }

  /**
   * Verfify Token Method
   * @static
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {object} returns the token object payload
   * @memberof Token
  */
  static async verifyToken(req, res, next) {
    const token = req.headers.authorization
      || req.headers['x-access-token'] || req.query.token || req.body.token;
    try {
      if (!token) {
        const response = new Response(
          false,
          401,
          'Unathorized, You did not provide a token'
        );
        return res.status(response.code).json(response);
      }
      const payload = await jwt.verify(token, envSecret);
      req.payload = payload;

      return next();
    } catch (err) {
      const response = new Response(
        false,
        401,
        'Unathorized, Your token is invalid or expired'
      );
      return res.status(response.code).json(response);
    }
  }
}

export default Token;
