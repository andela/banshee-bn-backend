import { Router } from 'express';
import Ratings from '../controllers/Rating';
import ratingSchema from '../validation/ratingSchema';
import validator from '../middlewares/validator';
import middleware from '../middlewares/AuthMiddlewares';
import tokenHelper from '../helpers/Token';

const ratingRoute = Router();

ratingRoute.post(
  '/ratings',
  tokenHelper.verifyToken,
  middleware.isUserVerified,
  validator(ratingSchema),
  Ratings.create
);

export default ratingRoute;
