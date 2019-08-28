import { Router } from 'express';
import authRoute from './user.routes';
import travelRoute from './trip.routes';

const router = Router();

router.use('/auth', authRoute);
router.use(travelRoute);

export default router;
