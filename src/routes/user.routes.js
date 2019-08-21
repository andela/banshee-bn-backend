import express from 'express';
import Auth from '../controllers/Auth';
import AuthMiddlewares from '../middlewares/AuthMiddlewares';

const authRoute = express.Router();

authRoute.post(
  '/signup',
  AuthMiddlewares.signUpValidator,
  Auth.signup
);

export default authRoute;
