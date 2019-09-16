import { Router } from 'express';
import Token from '../helpers/Token';
import AccomodationController from '../controllers/Accomodation';
import validator from '../middlewares/validator';
import middleware from '../middlewares/AuthMiddlewares';
import { createAccomodation, addRoom, accomodationBooking } from '../validation/accomodationSchema';
import permit from '../middlewares/permission';
import upload from '../utils/upload';

const accomodationRoutes = Router();

accomodationRoutes.post(
  '/create',
  Token.verifyToken, permit('travel admin', 'supplier'),
  upload.single('imgurl'),
  validator(createAccomodation),
  AccomodationController.createAccomodation
);

accomodationRoutes.post(
  '/addroom',
  Token.verifyToken, permit('travel admin', 'supplier'),
  validator(addRoom),
  AccomodationController.addRoom
);

accomodationRoutes.post('/booking',
  Token.verifyToken,
  middleware.isUserVerified,
  validator(accomodationBooking),
  AccomodationController.bookAccomodation);

export default accomodationRoutes;
