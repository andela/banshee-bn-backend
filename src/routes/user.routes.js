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
import TokenHelper from '../helpers/Token';


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
  AuthMiddlewares.checkExistingUser,
  AuthMiddlewares.checkExistingCompany,
  Auth.companySignup
);

authRoute.post(
  '/login',
  validator(loginSchema),
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

authRoute.patch(
  '/verify',
  TokenHelper.verifyToken,
  Auth.verifyEmail
);

export default authRoute;
