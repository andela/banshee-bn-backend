import { Router } from 'express';

import Auth from '../controllers/Auth';
import AuthMiddlewares from '../middlewares/AuthMiddlewares';
import Schemas from '../validation/auth';
import validator from '../middlewares/validator';

const {
  signupSchema
} = Schemas;

const authRoute = Router();

authRoute.post(
  '/signup',
  validator(signupSchema),
  AuthMiddlewares.checkExistingUser,
  AuthMiddlewares.signUpValidator,
  Auth.signup
);

export default authRoute;
