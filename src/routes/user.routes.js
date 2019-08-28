import { Router } from 'express';
import passport from 'passport';
import Auth from '../controllers/Auth';
import AuthMiddlewares from '../middlewares/AuthMiddlewares';
import {
  signupSchema,
  companySignupSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  loginWithCode
} from '../validation/authSchema';
import validator from '../middlewares/validator';
import checkValidationResult from '../middlewares/validationChecker';
import TokenHelper from '../helpers/Token';
import Strategy from '../config/passport/Strategy';


const { forgotPassword, resetPassword } = Auth;
const allStrategy = new Strategy();
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

authRoute.patch(
  '/verify',
  TokenHelper.verifyToken,
  Auth.verifyEmail
);

authRoute.get(('/google'),
  passport.authenticate(allStrategy.selectStrategy('google'),
    { scope: ['openid', 'email', 'profile'] }));

authRoute.get('/google/redirect',
  passport.authenticate(allStrategy.selectStrategy('google'),
    { failureRedirect: '/' }), Auth.loginWithGoogle);

authRoute.get('/facebook',
  passport.authenticate(allStrategy.selectStrategy('facebook')));

authRoute.get('/facebook/redirect',
  passport.authenticate(allStrategy.selectStrategy('facebook'),
    { failureRedirect: '/' }), Auth.loginWithFacebook);
authRoute.post('/code', validator(loginWithCode), Auth.completeLoginWithCode);

export default authRoute;
