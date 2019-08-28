import { Router } from 'express';
import UserTrip from '../controllers/Trip';

const travelRoute = Router();

travelRoute.post(
  '/travel/:id',
  UserTrip.requestTravel,
);

export default travelRoute;
