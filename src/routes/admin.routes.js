import { Router } from 'express';
import AdminController from '../controllers/Admin';
import Token from '../helpers/Token';
import updateUserRole from '../validation/adminSchema';
import validator from '../middlewares/validator';

const adminRoutes = Router();

adminRoutes.patch('/:email/role', Token.verifyAdminToken('super admin'),
  validator(updateUserRole), AdminController.updateUserRole);

export default adminRoutes;
