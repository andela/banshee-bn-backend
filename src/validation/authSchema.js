import { check } from 'express-validator';
import capitalize from '../utils/capitalize';

const dateRegex = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;

/* eslint-disable arrow-parens */
const schema = [
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
    .withMessage('Password must be alphanumeric and not be less than 8 characters'),

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

const signupSchema = [
  ...schema,
  check('companyCode')
    .trim()
    .exists().withMessage('Company code is required')
    .isLength({ min: 5, max: 15 })
    .withMessage('Company code should be between 5 to 15 characters')
];

const companySignupSchema = [
  ...schema,
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
    .exists().withMessage('Company code is required')
    .isLength({ min: 5, max: 15 })
    .withMessage('Company code should be between 5 to 15 characters')
];

const loginSchema = [
  check('email')
    .exists()
    .withMessage('Email is required')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Email must not be empty')
    .isEmail()
    .withMessage('Must be an email address'),
  check('password')
    .exists()
    .withMessage('Password is required')
    .trim()
    .isLength({ min: 8 })
    .withMessage('Invalid password'),
  check('code')
    .exists()
    .withMessage('Company code is required')
    .trim()
    .isLength({ min: 5, max: 15 })
    .withMessage('Invalid company code'),
];

const forgotPasswordSchema = [
  check('email')
    .not().isEmpty({ ignore_whitespace: true })
    .withMessage('Email is required')
    .trim()
    .isEmail()
    .withMessage('Invalid email format'),
];

const resetPasswordSchema = [
  check('password')
    .not().isEmpty({ ignore_whitespace: true })
    .withMessage('Password is required')
    .trim()
    .isLength({ min: 8, max: 32 })
    .withMessage('Password should be between 8 to 32 characters'),
  check('confirmPassword')
    .custom((value, { req }) => {
      const { password } = req.body;
      if (value !== password) {
        throw new Error('Password confirmation does not match password');
      }
      return true;
    })];

const loginWithCode = [
  check('id')
    .exists()
    .withMessage('Supply user id')
    .isLength({ min: 32 })
    .withMessage('Invalid user id'),

  check('email')
    .trim()
    .exists()
    .withMessage('Email address is required')
    .isEmail()
    .withMessage('Email address is invalid'),

  check('companyId')
    .trim()
    .exists()
    .withMessage('Supply user id')
    .isLength({ min: 32, max: 40 })
    .withMessage('Invalid user id'),

  check('code')
    .exists()
    .withMessage('Supply company code')
    .isLength({ min: 10 })
    .withMessage('Invalid company login code')
];

export {
  signupSchema,
  companySignupSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  loginWithCode
};
