import { Router } from 'express';
import CommentController from '../controllers/Comment';
import permit from '../middlewares/permission';
import Token from '../helpers/Token';
import validator from '../middlewares/validator';
import comment from '../middlewares/comment';
import {
  createCommentSchema,
  deleteCommentSchema
} from '../validation/commentSchema';

const commentRoute = Router();
const { findComment } = comment;

commentRoute.post(
  '/:tripId/comment',
  Token.verifyToken,
  permit('staff', 'manager'),
  validator(createCommentSchema),
  CommentController.createComment,
);

commentRoute.delete(
  '/:tripId/comment/:commentId',
  Token.verifyToken,
  validator(deleteCommentSchema),
  findComment,
  CommentController.deleteComment,
);

export default commentRoute;
