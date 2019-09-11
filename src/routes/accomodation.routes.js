import { Router } from 'express';
import Token from '../helpers/Token';
import AccomodationController from '../controllers/Accomodation';
import validator from '../middlewares/validator';
import { createAccomodation, addRoom } from '../validation/accomodationSchema';
import upload from '../utils/upload';

const accomodationRoutes = Router();

accomodationRoutes.post('/create',
  Token.verifyAdminToken('travel admin'), upload.single('imgurl'), validator(createAccomodation), AccomodationController.createAccomodation);

accomodationRoutes.post('/addroom',
  Token.verifyAdminToken('travel admin'), validator(addRoom), AccomodationController.addRoom);


export default accomodationRoutes;
