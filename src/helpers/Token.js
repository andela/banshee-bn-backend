import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const envSecret = process.env.SECRET;

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
    if (!token) {
      return res.status(401).json({
        status: 401,
        message: 'Unathorized, You did not provide a token',
      });
    }
    try {
      const payload = await jwt.verify(token, envSecret);
      req.payload = payload;

      return next();
    } catch (err) {
      return res.status(401).json({
        status: 401,
        message: 'Unathorized, Your token is invalid or expired',
      });
    }
  }
}

export default Token;
