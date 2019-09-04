import { Router } from 'express';
import authRoute from './user.routes';
import tripRoute from './trip.routes';
import profileRoute from './profile.routes';
import adminRoute from './admin.routes';

const router = Router();

router.use('/auth', authRoute);
router.use('/trips', tripRoute);
router.use(profileRoute);
router.use('/user', adminRoute);

export default router;
