import { Router } from 'express';
import TripController from '../controllers/Trip';
import Token from '../helpers/Token';
import validator from '../middlewares/validator';
import permit from '../middlewares/permission';
import verify from '../middlewares/AuthMiddlewares';
import { tripRequestSchema, tripRequestStatusSchema } from '../validation/tripSchema';

const tripRoutes = Router();

tripRoutes.get('/user', Token.verifyToken, TripController.getUserTrips);

tripRoutes.post(
  '/',
  Token.verifyToken,
  verify.isUserVerified,
  validator(tripRequestSchema),
  TripController.createTripRequest
);

tripRoutes.patch(
  '/:id',
  Token.verifyToken,
  permit('travel admin', 'manager'),
  validator(tripRequestStatusSchema),
  TripController.modifyTripRequestStatus,
);

export default tripRoutes;
