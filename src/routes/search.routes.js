import { Router } from 'express';
import SearchController from '../controllers/Search';
import searchSchema from '../validation/searchSchema';
import validator from '../middlewares/validator';
import middlewares from '../middlewares/AuthMiddlewares';
import Token from '../helpers/Token';

const router = Router();
const { search } = SearchController;

router.get(
  '/',
  Token.verifyToken,
  middlewares.isUserVerified,
  validator(searchSchema),
  search
);

export default router;
