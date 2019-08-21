import { Router } from 'express';
import Auth from '../controllers/Auth';
import AuthMiddlewares from '../middlewares/AuthMiddlewares';
import {
  signupSchema,
  companySignupSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema
} from '../validation/authSchema';
import validator from '../middlewares/validator';
import checkValidationResult from '../middlewares/validationChecker';


const { forgotPassword, resetPassword } = Auth;

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

authRoute.post(
  '/forgot_password',
  validator(forgotPasswordSchema),
  forgotPassword
);

authRoute.post(
  '/reset_password/:resetToken',
  validator(resetPasswordSchema),
  resetPassword
);

export default authRoute;
