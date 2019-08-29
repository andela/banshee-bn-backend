import { check } from 'express-validator';
import capitalize from '../utils/capitalize';

const dateRegex = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;

/* eslint-disable arrow-parens */
const profileSchema = [
  check('firstName')
    .optional().trim()
    .isLength({ min: 2, max: 15 })
    .withMessage('First name should be between 2 to 15 characters')
    .isAlpha()
    .withMessage('First name should only contain alphabets')
    .customSanitizer(value => capitalize(value)),

  check('lastName')
    .optional().trim()
    .isLength({ min: 2, max: 15 })
    .withMessage('Last name should be between 2 to 15 characters')
    .isAlpha()
    .withMessage('Last name should only contain alphabets')
    .customSanitizer(value => capitalize(value)),

  check('dob')
    .optional().matches(dateRegex)
    .withMessage("Date must be of the format 'yyyy-mm-dd'")
    .custom(value => {
      const year = value.substring(0, 4);
      const today = new Date().getFullYear();
      if ((today - year) < 18) {
        return false;
      }
      return true;
    })
    .withMessage('Users must be 18 and above'),

  check('gender')
    .optional()
    .matches(/^(male|m|female|f)$/)
    .withMessage('Male or Female is the accepted value'),

  check('companyName')
    .optional().trim()
    .isLength({ min: 1 })
    .customSanitizer(value => capitalize(value)),

  check('address')
    .optional().trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Address should be between 2 to 100 characters')
    .customSanitizer(value => capitalize(value))
];

export default profileSchema;
