import { Router } from 'express';
import TripController from '../controllers/Trip';
import Token from '../helpers/Token';
import validator from '../middlewares/validator';
import { oneWaySchema } from '../validation/tripSchema';

const tripRoutes = Router();

tripRoutes.get('/user', Token.verifyToken, TripController.getUserTrips);
tripRoutes.post(
  '/',
  Token.verifyToken,
  validator(oneWaySchema),
  TripController.createTripRequest
);

export default tripRoutes;
