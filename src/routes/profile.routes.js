import { Router } from 'express';
import Profile from '../controllers/Profile';
import profileSchema from '../validation/profileSchema';
import validator from '../middlewares/validator';
import middleware from '../middlewares/AuthMiddlewares';
import tokenHelper from '../helpers/Token';

const profileRoute = Router();

profileRoute.get(
  '/profile',
  tokenHelper.verifyToken,
  middleware.isUserVerified,
  Profile.getProfile,
);

profileRoute.patch(
  '/profile',
  validator(profileSchema),
  tokenHelper.verifyToken,
  middleware.isUserVerified,
  Profile.updateProfile,
);

export default profileRoute;
