import { Router } from 'express';
import authRoute from './user.routes';
import requestRoutes from './request';

const router = Router();

router.use('/auth', authRoute);
router.use('/user', requestRoutes);

export default router;
