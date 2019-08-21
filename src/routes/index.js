import express from 'express';

import authRoute from './user.routes';

const router = express.Router();

router.use('/auth', authRoute);

export default router;
