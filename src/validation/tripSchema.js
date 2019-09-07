import { body, check } from 'express-validator';
import { isValid, parseISO } from 'date-fns';
import models from '../database/models';

const { Branch, Accomodation } = models;

const tripRequestSchema = [
  body('type')
    .not().isEmpty({ ignore_whitespace: true })
    .withMessage('Trip type is required')
    .trim()
    .isIn(['oneway', 'return'])
    .withMessage('Invalid trip type'),
  body('from')
    .not().isEmpty({ ignore_whitespace: true })
    .withMessage('Starting point is required')
    .trim()
    .isUUID(4)
    .withMessage('Invalid starting point')
    .custom(async (value) => {
      const branch = await Branch.findOne({ where: { id: value } });
      if (!branch) {
        throw new Error('Start branch location does not exist');
      }
      return true;
    }),
  body('departureDate')
    .not().isEmpty({ ignore_whitespace: true })
    .withMessage('Departure date is required')
    .custom((value) => isValid(parseISO(value)))
    .withMessage('Invalid departure date format')
    .customSanitizer((value) => new Date(value)),
  body('returnDate')
    .trim()
    .custom((value, { req }) => {
      const { type, departureDate } = req.body;
      if (type === 'return') {
        if (!isValid(parseISO(value))) {
          throw new Error('Invalid return date format');
        }
        if (new Date(value) <= new Date(departureDate)) {
          throw new Error('Return date must be greater than departure date');
        }
      }
      return true;
    })
    .customSanitizer((value) => new Date(value)),
  body('reason')
    .not().isEmpty({ ignore_whitespace: true })
    .withMessage('Travel reason is required')
    .trim(),
  body('destination.to')
    .exists()
    .withMessage('Destination does not exist')
    .trim()
    .isUUID(4)
    .withMessage('Invalid destination format')
    .custom(async (value, { req }) => {
      const branch = await Branch.findOne({ where: { id: value } });
      if (!branch) {
        throw new Error('Destination does not exist');
      }
      if (value === req.body.from) {
        throw new Error('Start and Destination should not be the same');
      }
      return true;
    }),
  body('destination.accomodation')
    .exists()
    .withMessage('Accomodation does not exist')
    .trim()
    .isUUID(4)
    .withMessage('Invalid accomodation format')
    .custom(async (value) => {
      const accomodation = await Accomodation.findOne({ where: { id: value } });
      if (!accomodation) {
        throw new Error('Accomodation does not exist');
      }
      return true;
    }),
];

const tripRequestStatusSchema = [
  check('status')
    .exists()
    .withMessage('Trip status is required')
    .trim()
    .custom((value) => ['pending', 'approved', 'rejected'].includes(value))
    .withMessage('Invalid trip status'),
  
  check('tripId')
    .exists()
    .withMessage('Trip Id is required')
    .trim()
    .isUUID(4)
    .withMessage('Invalid trip id')
];

export { tripRequestStatusSchema, tripRequestSchema };
