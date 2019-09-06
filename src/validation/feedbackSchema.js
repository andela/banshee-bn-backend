import { check } from 'express-validator';
import models from '../database/models';
import capitalize from '../utils/capitalize';

const { Trip } = models;

/* eslint-disable arrow-parens */
const accomodationFeedback = [
  check('reviews')
    .trim()
    .optional()
    .isLength({ min: 2 })
    .withMessage(' reviews should not be lower than 2 characters')
    .customSanitizer(value => capitalize(value)),

  check('likeDislike')
    .exists()
    .withMessage('like|dislike is required')
    .matches(/^(like|dislike)$/)
    .withMessage('like or dislike is the accepted value'),

  check('tripId')
    .exists()
    .withMessage('Trip Id is required')
    .custom(async (value, { req }) => {
      const trip = await Trip.findOne({ where: { id: req.body.tripId } });
      if (!trip) {
        throw new Error('Trip does not exist');
      }
      return true;
    }),

  check('accomodationId')
    .exists().withMessage('Accomodation Id is required')
    .isUUID(4)
    .withMessage('Invalid Accomodation Id format')
]

export default accomodationFeedback;
