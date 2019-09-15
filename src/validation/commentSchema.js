import { check } from 'express-validator';
import models from '../database/models';

const { Trip, Comment } = models;

const createCommentSchema = [
  check('body')
    .trim()
    .exists()
    .withMessage('Comment is required')
    .isLength({ min: 2 })
    .withMessage('Comment should not be less than 2 characters'),

  check('userId')
    .isUUID(4)
    .optional(),

  check('tripId')
    .isUUID(4)
    .withMessage('Trip ID is not valid. Should be of type UUID')
    .custom(async (value) => {
      const getTrip = await Trip.findOne({ where: { id: value } });
      if (!getTrip) {
        throw new Error('Trip ID does not exist');
      }
      return true;
    })
];

const deleteCommentSchema = [
  check('tripId')
    .trim()
    .exists()
    .withMessage('Trip ID is required')
    .isUUID(4)
    .withMessage('Trip ID is not valid. Should be of type UUID')
    .custom(async (value) => {
      const getTrip = await Trip.findOne({ where: { id: value } });
      if (!getTrip) {
        throw new Error('Trip ID does not exist');
      }
      return true;
    }),

  check('commentId')
    .trim()
    .exists()
    .withMessage('Trip ID is required')
    .isUUID(4)
    .withMessage('Comment ID is not valid. Should be of type UUID')
    .custom(async (value) => {
      const getComment = await Comment.findOne({ where: { id: value } });
      if (!getComment) {
        throw new Error('Comment ID does not exist');
      }
      return true;
    }),
];

export { createCommentSchema, deleteCommentSchema };
