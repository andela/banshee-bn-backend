import { Router } from 'express';
import authRoute from './user.routes';
import tripRoute from './trip.routes';
import profileRoute from './profile.routes';
import adminRoute from './admin.routes';
import feedbackRoute from './feedback.routes';
import searchRoute from './search.routes';
import accomodationRoutes from './accomodation.routes';
import commentRoute from './comment.routes';
import notificationOptRoute from './notificationOpt.routes';
import ratingRoute from './rating.routes';

const router = Router();

router.use('/auth', authRoute);
router.use('/trips', tripRoute);
router.use('/notifications', notificationOptRoute);
router.use(profileRoute);
router.use('/accomodation', feedbackRoute);
router.use('/search', searchRoute);
router.use('/admin/accomodation', accomodationRoutes);
router.use('/user/accomodation', accomodationRoutes);
router.use('/trips', commentRoute);
router.use('/', adminRoute);
router.use('/accomodation', ratingRoute);

export default router;
