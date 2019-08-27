import { Router } from 'express';
import Auth from '../controllers/Auth';
import AuthMiddlewares from '../middlewares/AuthMiddlewares';
import { signupSchema, companySignupSchema } from '../validation/auth';
import validator from '../middlewares/validator';

const authRoute = Router();

authRoute.post(
  '/register/user',
  validator(signupSchema),
  AuthMiddlewares.checkExistingUser,
  AuthMiddlewares.signUpValidator,
  Auth.signup
);

authRoute.post(
  '/register/company',
  validator(companySignupSchema),
  Auth.companySignup
);

export default authRoute;
