import { check } from 'express-validator';

const emailOptSchema = [
  check('emailOpt')
    .exists()
    .withMessage('Email option is required')
    .isBoolean()
    .withMessage('Email option must be a boolean')
];

export { emailOptSchema }
