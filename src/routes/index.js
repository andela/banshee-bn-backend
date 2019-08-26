import { Router } from 'express';

import authRoute from './user.routes';

const router = Router();

router.use('/auth', authRoute);

export default router;
