import { validationResult, matchedData } from 'express-validator';
import Response from '../helpers/Response';

/**
 * Schema validator
 * @param {Array} schemas
 * @param {number} status
 * @returns {Array} an array of validation schema and middleware
 */
export default (schemas) => {
  const validatorCheck = async (req, res, next) => {
    const errors = validationResult(req);
    req = { ...req, ...matchedData(req) };

    if (!errors.isEmpty()) {
      const mapErrors = Object.entries(errors.mapped()).reduce(
        (accumulator, [key, value]) => {
          accumulator[key] = value.msg;
          return accumulator;
        }, {},
      );

      const response = new Response(
        false,
        400,
        'Validation Error!',
        mapErrors,
      );
      return res.status(response.code).json(response);
    }

    return next();
  };
  return [...(schemas.length && [schemas]), validatorCheck];
};
