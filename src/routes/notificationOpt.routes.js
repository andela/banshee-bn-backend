import { Router } from 'express';
import NotificationOpt from '../controllers/NotificationOpt';
import validator from '../middlewares/validator';
import TokenHelper from '../helpers/Token';
import { emailOptSchema, inAppOptSchema } from '../validation/notificationOptSchema';

const notificationOptRoute = Router();

notificationOptRoute.patch(
  '/email_opt',
  TokenHelper.verifyToken,
  validator(emailOptSchema),
  NotificationOpt.modifyEmailNotificationOption,
);
notificationOptRoute.patch(
  '/in_app_opt',
  TokenHelper.verifyToken,
  validator(inAppOptSchema),
  NotificationOpt.modifyInAppNotificationOption
);

notificationOptRoute.patch(
  '/read',
  TokenHelper.verifyAdminToken('travel admin', 'manager'),
  NotificationOpt.readAllNotifications
);

export default notificationOptRoute;
