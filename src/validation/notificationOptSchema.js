import { check } from 'express-validator';

const emailOptSchema = [
  check('emailOpt')
    .exists()
    .withMessage('Email option is required')
    .isBoolean()
    .withMessage('Email option must be a boolean')
];

const inAppOptSchema = [
  check('inAppOpt')
    .exists()
    .withMessage('In App option is required')
    .isBoolean()
    .withMessage('In App option must be a boolean')
];

export {
  inAppOptSchema,
  emailOptSchema
};
