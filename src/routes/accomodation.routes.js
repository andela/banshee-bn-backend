import { Router } from 'express';
import Token from '../helpers/Token';
import AccomodationController from '../controllers/Accomodation';
import validator from '../middlewares/validator';
import middleware from '../middlewares/AuthMiddlewares';
import { createAccomodation, addRoom, accomodationBooking } from '../validation/accomodationSchema';

const accomodationRoutes = Router();

accomodationRoutes.post('/create',
  Token.verifyAdminToken('travel admin'), validator(createAccomodation), AccomodationController.createAccomodation);

accomodationRoutes.post('/addroom',
  Token.verifyAdminToken('travel admin'), validator(addRoom), AccomodationController.addRoom);

accomodationRoutes.post('/booking',
  Token.verifyToken,
  middleware.isUserVerified,
  validator(accomodationBooking),
  AccomodationController.bookAccomodation);

export default accomodationRoutes;
