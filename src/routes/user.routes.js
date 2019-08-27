import { Router } from 'express';
import Auth from '../controllers/Auth';
import AuthMiddlewares from '../middlewares/AuthMiddlewares';
import { signupSchema, companySignupSchema, loginSchema } from '../validation/auth';
import validator from '../middlewares/validator';
import checkValidationResult from '../middlewares/validationChecker';

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

authRoute.post(
  '/login',
  loginSchema,
  checkValidationResult,
  Auth.login,
);
export default authRoute;
