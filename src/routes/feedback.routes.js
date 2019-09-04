import { Router } from 'express';
import Feedback from '../controllers/Feedback';
import feedbackSchema from '../validation/feedbackSchema';
import validator from '../middlewares/validator';
import middleware from '../middlewares/AuthMiddlewares';
import tokenHelper from '../helpers/Token';

const feedbackRoute = Router();

feedbackRoute.post(
  '/feedback',
  tokenHelper.verifyToken,
  middleware.isUserVerified,
  validator(feedbackSchema),
  Feedback.postAccomodationFeedback,
);


export default feedbackRoute;
