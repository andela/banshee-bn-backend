import { check } from 'express-validator';
import models from '../database/models';

const { Branch, Accomodation } = models;
const dateRegex = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;

const oneWaySchema = [
  check('type')
    .isIn(['oneway', 'return'])
    .withMessage('Invalid query parameter'),
  check('from')
    .exists()
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
  check('departureDate')
    .not().isEmpty({ ignore_whitespace: true })
    .withMessage('Departure date is required')
    .matches(dateRegex)
    .withMessage('Invalid departure date format'),
  check('reason')
    .not().isEmpty({ ignore_whitespace: true })
    .withMessage('Travel reason is required')
    .trim(),
  check('destination.to')
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
  check('destination.accomodation')
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

export { oneWaySchema };
