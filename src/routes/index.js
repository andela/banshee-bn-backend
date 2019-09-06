import { Router } from 'express';
import authRoute from './user.routes';
import tripRoute from './trip.routes';
import profileRoute from './profile.routes';
import adminRoute from './admin.routes';
import feedbackRoute from './feedback.routes';

const router = Router();

router.use('/auth', authRoute);
router.use('/trips', tripRoute);
router.use(profileRoute);
router.use('/user', adminRoute);
router.use('/accomodation', feedbackRoute);

export default router;
