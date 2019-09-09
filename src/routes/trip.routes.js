import { Router } from 'express';
import TripController from '../controllers/Trip';
import Token from '../helpers/Token';
import validator from '../middlewares/validator';
import permit from '../middlewares/permission';
import verify from '../middlewares/AuthMiddlewares';
import {
  tripRequestSchema,
  tripRequestStatusSchema,
  editTripRequestSchema
} from '../validation/tripSchema';

const tripRoutes = Router();

tripRoutes.get('/user', Token.verifyToken, TripController.getUserTrips);

tripRoutes.get(
  '/',
  Token.verifyToken,
  permit('manager'),
  TripController.getPendingRequests
);

tripRoutes.post(
  '/',
  Token.verifyToken,
  verify.isUserVerified,
  validator(tripRequestSchema),
  TripController.createTripRequest
);
tripRoutes.put(
  '/:tripId',
  Token.verifyToken,
  verify.isUserVerified,
  validator(editTripRequestSchema),
  TripController.editTripRequest
);

tripRoutes.patch(
  '/:tripId',
  Token.verifyToken,
  permit('travel admin', 'manager'),
  validator(tripRequestStatusSchema),
  TripController.modifyTripRequestStatus,
);

tripRoutes.get('/mostvisited', Token.verifyToken, TripController.getMostVisitedBranch);

export default tripRoutes;
