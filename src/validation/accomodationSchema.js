import { check } from 'express-validator';
import db from '../database/models';

const {
  Branch, Accomodation, Location, Room
} = db;

const createAccomodation = [
  check('name')
    .exists()
    .withMessage('Accomodation center name is required')
    .trim()
    .isLength({ min: 10, max: 50 })
    .withMessage('Accomodation center name should be between 10 and 50 characters'),
  check('branchId')
    .exists()
    .withMessage('Branch Id is required')
    .isUUID(4)
    .withMessage('Invalid branch Id')
    .custom(async (value, { req }) => {
      const branch = await Branch.findOne({
        where: { id: req.body.branchId },
        attributes: ['id'],
        include: [
          {
            model: Location, as: 'location', attributes: ['companyId']
          }
        ]
      });
      if (!branch) {
        throw new Error('Supplied branch is not found');
      }
      const { payload } = req.payload;
      const { companyId } = branch.location.dataValues;
      if (payload.companyId !== companyId) {
        throw new Error('You cannot create accomodation for other companies');
      }

      // check if name already exists in that branch
      const accomodationName = await Accomodation.findOne(
        { where: { branchId: value, name: req.body.name } }
      );
      if (accomodationName) {
        throw new Error('Supplied accomodation is already registered');
      }
      return true;
    }),
  check('capacity')
    .exists()
    .withMessage('Accomodation capacity is required')
    .isInt({ min: 1, max: 120 })
    .withMessage('Accomodation capacity cannot be more than 120'),
  check('address')
    .exists()
    .withMessage('Accomodation address is required')
    .trim()
    .isLength({ min: 10, max: 100 })
    .withMessage('Address should be between 10 and 100 characters'),
];

const addRoom = [
  check('name')
    .exists()
    .withMessage('Room name is required')
    .trim()
    .isLength({ min: 5, max: 50 })
    .withMessage('Room name should be between 5 and 50 characters'),
  check('accomodationId')
    .exists()
    .withMessage('Accomodation Id is required')
    .custom(async (value, { req }) => {
      const accomodation = await Accomodation.findOne({
        where: { id: value },
        attributes: ['id', 'capacity'],
        include: [
          {
            model: Branch,
            as: 'branch',
            attributes: ['id'],
            include: [
              {
                model: Location, as: 'location', attributes: ['companyId']
              }
            ]
          }
        ]
      });
      if (!accomodation) {
        throw new Error('Supplied accomodation is not found');
      }
      const { payload } = req.payload;
      const { companyId } = accomodation.branch.location.dataValues;
      if (payload.companyId !== companyId) {
        throw new Error('You cannot add rooms to other companies accomodation facilities');
      }

      const roomName = await Room.findOne(
        { where: { accomodationId: value, name: req.body.name, type: req.body.type } }
      );
      if (roomName) {
        throw new Error('Supplied room already registered');
      }

      const createdRooms = await Room.count({ where: { accomodationId: value } });
      if (createdRooms >= accomodation.dataValues.capacity) {
        throw new Error('Rooms cannot exceed the capacity of the accomodation facility');
      }

      return true;
    }),
  check('type')
    .exists()
    .withMessage('Room type is required')
    .trim()
    .isLength({ min: 5, max: 50 })
    .withMessage('Room type should not exceed 50 characters and not less than 5 characters long')
];

export { createAccomodation, addRoom };
