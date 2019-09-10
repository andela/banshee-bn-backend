import { body, check, param } from 'express-validator';
import {
  isValid, parseISO, isFuture
} from 'date-fns';
import validateUUID from 'uuid-validate';
import models from '../database/models';

const { Branch, Accomodation, Stop } = models;

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
    .custom((value) => isValid(parseISO(value)) && isFuture(new Date(value)))
    .withMessage('Invalid departure date format')
    .customSanitizer((value) => new Date(value)),
  body('returnDate')
    .trim()
    .custom((value, { req }) => {
      const { type, departureDate } = req.body;
      if (type === 'return') {
        if (!isValid(parseISO(value)) || !isFuture(new Date(value))) {
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
  body('destinations')
    .not().isEmpty()
    .withMessage('Destination(s) is required')
    .isArray()
    .withMessage('Invalid destination format'),
  body('destinations.*.to')
    .exists()
    .withMessage('Destination does not exist')
    .trim()
    .isUUID(4)
    .withMessage('Invalid destination format')
    .custom(async (value, { req }) => {
      const { destinations } = req.body;
      const branch = await Branch.findOne({ where: { id: value } });
      if (!branch) {
        throw new Error('Destination does not exist');
      }
      if (value === req.body.from) {
        throw new Error('Start and Destination should not be the same');
      }

      const filtered = destinations.filter(
        (data) => data.to === value
      );
      if (filtered.length > 1) {
        throw new Error('One or more destination branches are the same');
      }
      return true;
    }),
  body('destinations.*.accomodation')
    .not().isEmpty()
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

const editTripRequestSchema = [
  param('tripId')
    .isUUID(4)
    .withMessage('Invalid trip Id'),
  body('from')
    .optional()
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
    .optional()
    .not().isEmpty({ ignore_whitespace: true })
    .withMessage('Departure date is required')
    .custom((value) => isValid(parseISO(value)) && isFuture(new Date(value)))
    .withMessage('Invalid departure date format')
    .customSanitizer((value) => new Date(value)),
  body('returnDate')
    .optional()
    .trim()
    .custom((value, { req }) => {
      const { departureDate } = req.body;
      if (!isValid(parseISO(value)) || !isFuture(new Date(value))) {
        throw new Error('Invalid return date format');
      }
      if (new Date(value) <= new Date(departureDate)) {
        throw new Error('Return date must be greater than departure date');
      }
      return true;
    })
    .customSanitizer((value) => new Date(value)),
  body('reason')
    .optional()
    .not().isEmpty({ ignore_whitespace: true })
    .withMessage('Travel reason is required')
    .trim(),
  body('destinations')
    .optional()
    .exists()
    .withMessage('Destination(s) is required')
    .isArray()
    .withMessage('Invalid destination(s) format'),
  body('destinations.*.id')
    .custom(async (value, { req }) => {
      if (req.body.destinations) {
        if (!validateUUID(value, 4)) {
          throw new Error('Invalid destination Id format');
        }
        const stop = await Stop.findOne({ where: { id: value } });
        if (!stop) {
          throw new Error('Destination does not exist');
        }
      }
      return true;
    }),
  body('destinations.*.to')
    .optional()
    .exists()
    .withMessage('Destination is required')
    .trim()
    .isUUID(4)
    .withMessage('Invalid destination format')
    .custom(async (value, { req }) => {
      const { destinations } = req.body;
      const branch = await Branch.findOne({ where: { id: value } });
      if (!branch) {
        throw new Error('Destination branch does not exist');
      }
      if (value === req.body.from) {
        throw new Error('Start and Destination branch should not be the same');
      }
      const filtered = destinations.filter(
        (destination) => destination.to === value
      );
      if (filtered.length > 1) {
        throw new Error('One or more destination branches are the same');
      }
      return true;
    }),
  body('destinations.*.accomodation')
    .optional()
    .exists()
    .withMessage('Accomodation is required')
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

export { tripRequestStatusSchema, tripRequestSchema, editTripRequestSchema };
