import { body } from 'express-validator';

const addSupplierSchema = [
  body('firstName')
    .not().isEmpty({ ignore_whitespace: true })
    .withMessage('First name is required')
    .isLength({ min: 2, max: 15 })
    .withMessage('First name should be between 2 to 15 characters')
    .isAlpha()
    .withMessage('First name should only contain alphabets')
    .trim(),
  body('lastName')
    .not().isEmpty({ ignore_whitespace: true })
    .withMessage('Last name is required')
    .isLength({ min: 2, max: 15 })
    .withMessage('Last name should be between 2 to 15 characters')
    .isAlpha()
    .withMessage('Last name should only contain alphabets')
    .trim(),
  body('email')
    .not().isEmpty({ ignore_whitespace: true })
    .withMessage('Email is required')
    .trim()
    .isEmail()
    .withMessage('Invalid email format'),
  body('password')
    .not().isEmpty({ ignore_whitespace: true })
    .withMessage('Password is required')
    .trim()
    .isLength({ min: 8, max: 32 })
    .withMessage('Password should be between 8 to 32 characters')
];

export default addSupplierSchema;
