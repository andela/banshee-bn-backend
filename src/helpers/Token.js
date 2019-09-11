import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Response from './Response';
import db from '../database/models';

const { User } = db;

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
        'Unauthorized, Your token is invalid or expired'
      );
      return res.status(response.code).json(response);
    }
  }

  /**
   * Verify admin user
   * @static
   * @param {string} role - User role
   * @param {object} req - HTTP Request object
   * @param {object} res  - HTTP Response object
   * @param {function} next - callback function
   * @returns {object} returns admin token
   */
  static verifyAdminToken(role) {
    return async (req, res, next) => {
      const token = req.headers.authorization
      || req.headers['x-access-token'] || req.query.token || req.body.token;
      if (!token) {
        return res.status(401).json(
          new Response(false, 401, 'Unauthorized, You did not provide a token')
        );
      }
      try {
        const decoded = jwt.verify(token, envSecret);
        const user = await User.findOne({ where: { id: decoded.payload.id } });
        if (!user || user.status !== 'active' || user.role !== role) {
          return res.status(401).json(
            new Response(false, 401, `Only active ${role}s can access this resource`)
          );
        }
        req.payload = decoded;
        return next();
      } catch (error) {
        return res.status(500).json(new Response(false, 500, 'There\'s an error processing your token'));
      }
    };
  }
}

export default Token;
