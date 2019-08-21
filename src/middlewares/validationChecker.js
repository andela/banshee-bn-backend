import { validationResult } from 'express-validator';
import Response from '../helpers/Response';

const checkValidationResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const response = new Response(false, 400, 'Validation error', { errors: errors.array() });
    return res.status(response.code).json(response);
  }
  next();
};

export default checkValidationResult;
