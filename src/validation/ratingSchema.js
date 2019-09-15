import { check } from 'express-validator';

const rating = [
  check('accomodationId')
    .exists().withMessage('Accomodation Id is required')
    .isUUID(4)
    .withMessage('Invalid Accomodation Id format'),

  check('ratingValue')
    .exists().withMessage('Rating is required')
    .isInt()
    .withMessage('Ratings should be a number between 0 to 5')
    .custom((value, { req }) => {
      if (value > 5) {
        throw new Error('Ratings should be between the number 0 to 5');
      }
      return true;
    })
];

export default rating;
