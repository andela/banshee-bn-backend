import { check } from 'express-validator';
import models from '../database/models';

const { Location, Branch } = models;

const updateUserRole = [
  check('role')
    .trim()
    .exists()
    .withMessage('Supply role to update user\'s role')
    .matches(/\b(?:super admin|travel admin|travel team member|manager|requester|staff)\b/)
    .withMessage('Supply a valid role'),

];

const companyLocation = [
  check('country')
    .exists()
    .withMessage('Supply the Country of Location')
    .isLength({ min: 5, max: 25 })
    .withMessage('Country name cannot be less than 5 characters and not more than 25 characters'),

  check('city')
    .exists()
    .withMessage('Supply the city')
    .isLength({ min: 5, max: 25 })
    .withMessage('Country name cannot be less than 5 characters and not more than 25 characters')
    .custom(async (value, { req }) => {
      const { companyId } = req.payload.payload;

      const locationInDb = await Location.findOne({
        where: { companyId, country: req.body.country, city: value },
        attributes: ['id']
      });

      if (locationInDb) {
        throw new Error('Location already registered');
      }
      return true;
    })
];

const companyBranch = [
  check('name')
    .exists()
    .withMessage('Supply branch name')
    .isLength({ min: 5, max: 50 })
    .withMessage('Branch name cannot be less than 5 characters and not more than 50 characters'),

  check('locationId')
    .exists()
    .withMessage('Supply the branch location')
    .trim()
    .isUUID(4)
    .withMessage('Invalid location id')
    .custom(async (value, { req }) => {
      const { companyId } = req.payload.payload;

      const locationInDb = await Location.findOne({
        where: { id: value, companyId },
        attributes: ['id']
      });

      if (!locationInDb) {
        throw new Error('Unknown location');
      }

      const checkBranch = await Branch.findOne({
        where: { locationId: value, name: req.body.name }
      });

      if (checkBranch) {
        throw new Error('Branch already registered');
      }

      return true;
    })
];

export { updateUserRole, companyLocation, companyBranch };
