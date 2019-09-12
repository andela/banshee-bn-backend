import { Router } from 'express';
import CommentController from '../controllers/Comment';
import permit from '../middlewares/permission';
import Token from '../helpers/Token';
import validator from '../middlewares/validator';
import { createCommentSchema } from '../validation/commentSchema';

const commentRoute = Router();

commentRoute.post(
  '/:tripId/comment',
  Token.verifyToken,
  permit('staff', 'manager'),
  validator(createCommentSchema),
  CommentController.createComment,
);

export default commentRoute;
