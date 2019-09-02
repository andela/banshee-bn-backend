import { Router } from 'express';
import authRoute from './user.routes';
import tripRoute from './trip.routes';

const router = Router();

router.use('/auth', authRoute);
router.use('/trips', tripRoute);

export default router;
