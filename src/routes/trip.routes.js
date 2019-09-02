import { Router } from 'express';
import TripController from '../controllers/Trip';
import Token from '../helpers/Token';

const tripRoutes = Router();

tripRoutes.get('/user', Token.verifyToken, TripController.getUserTrips);

export default tripRoutes;
