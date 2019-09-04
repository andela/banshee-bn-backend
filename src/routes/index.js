import { Router } from 'express';
import authRoute from './user.routes';
import tripRoute from './trip.routes';
import profileRoute from './profile.routes';

const router = Router();

router.use('/auth', authRoute);
router.use('/trips', tripRoute);
router.use(profileRoute);

export default router;
