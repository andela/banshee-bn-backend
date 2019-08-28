import { Router } from 'express';
import TravelRequest from '../controllers/TravelRequest';
import TravelMiddleware from '../middlewares/TripMiddleware';
import Token from '../helpers/Token';

const requestRoutes = Router();

requestRoutes.get('/trips', Token.verifyToken, TravelRequest.getUserTrips);

requestRoutes.post(
  '/trips',
  Token.verifyToken,
  TravelMiddleware.getProfileInfo
);

export default requestRoutes;
