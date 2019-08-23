import { check } from 'express-validator';
import capitalize from '../utils/capitalize';

const dateRegex = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;

/* eslint-disable arrow-parens */
const signupSchema = [
  check('firstName')
    .trim()
    .exists().withMessage('First name is required')
    .isLength({ min: 2, max: 15 })
    .withMessage('First name should be between 2 to 15 characters')
    .isAlpha()
    .withMessage('First name should only contain alphabets')
    .customSanitizer(value => capitalize(value)),

  check('lastName')
    .trim()
    .exists().withMessage('Last name is required')
    .isLength({ min: 2, max: 15 })
    .withMessage('Last name should be between 2 to 15 characters')
    .isAlpha()
    .withMessage('Last name should only contain alphabets')
    .customSanitizer(value => capitalize(value)),

  check('email')
    .trim()
    .exists()
    .withMessage('Email address is required')
    .isEmail()
    .withMessage('Email address is invalid'),

  check('password')
    .trim()
    .exists().withMessage('Password is required')
    .isLength({ min: 8, })
    .withMessage('Password must be alphanumeric and not be less than 8 characters')
    .isAlphanumeric()
    .withMessage(
      'Password must be alphanumeric and not be less than 8 characters'
    ),

  check('dob')
    .exists()
    .withMessage('Date of Birth is required')
    .matches(dateRegex)
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
    .exists()
    .withMessage('Gender is required')
    .matches(/^(male|m|female|f)$/)
    .withMessage('Male or Female is the accepted value')
];

const companySignupSchema = [
  ...signupSchema,
  check('companyName')
    .trim()
    .isLength({ min: 1 }).withMessage('Company name is required')
    .customSanitizer(value => capitalize(value)),

  check('address')
    .trim()
    .exists().withMessage('Address is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Address should be between 2 to 100 characters')
    .customSanitizer(value => capitalize(value)),

  check('code')
    .trim()
    .exists().withMessage('Last name is required')
    .isLength({ min: 5, max: 15 })
    .withMessage('Company code should be between 5 to 15 characters')
];

export {
  signupSchema,
  companySignupSchema
};