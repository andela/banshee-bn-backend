import { query } from 'express-validator';
import { isValid, parseISO } from 'date-fns';

const searchSchema = [
  query('page')
    .optional()
    .isInt()
    .withMessage('Invalid page format'),
  query('limit')
    .optional()
    .isInt()
    .withMessage('Invalid limit format'),
  query('from')
    .optional()
    .custom((value) => isValid(parseISO(value)))
    .withMessage('Invalid date(from) format'),
  query('to')
    .optional()
    .custom((value) => isValid(parseISO(value)))
    .withMessage('Invalid date(to) format')
];

export default searchSchema;
