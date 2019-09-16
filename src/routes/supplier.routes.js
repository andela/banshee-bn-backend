import { Router } from 'express';
import SupplierController from '../controllers/Supplier';
import supplierSchema from '../validation/supplierSchema';
import validator from '../middlewares/validator';
import Token from '../helpers/Token';
import permit from '../middlewares/permission';

const router = Router();
const { addSupplier, supplierLogin } = SupplierController;

router.post(
  '/add',
  Token.verifyToken,
  permit('travel admin'),
  validator(supplierSchema),
  addSupplier
);
router.post(
  '/login',
  supplierLogin
);

export default router;
