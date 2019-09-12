import { Router } from 'express';
import AdminController from '../controllers/Admin';
import Token from '../helpers/Token';
import { updateUserRole, companyLocation, companyBranch } from '../validation/adminSchema';
import validator from '../middlewares/validator';

const adminRoutes = Router();

adminRoutes.patch(
  '/user/:email/role',
  Token.verifyAdminToken('super admin'),
  validator(updateUserRole),
  AdminController.updateUserRole
);

adminRoutes.get(
  '/user/all',
  Token.verifyAdminToken('super admin'),
  AdminController.getAllUsers
);
adminRoutes.patch('/user/:email/role', Token.verifyAdminToken('super admin'),
  validator(updateUserRole), AdminController.updateUserRole);

adminRoutes.post('/location/create', Token.verifyAdminToken('manager'),
  validator(companyLocation), AdminController.createCompanyLocation);
adminRoutes.post('/branch/create', Token.verifyAdminToken('manager'),
  validator(companyBranch), AdminController.createCompanyBranch);

export default adminRoutes;
