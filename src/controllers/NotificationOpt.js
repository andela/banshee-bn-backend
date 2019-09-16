import jwt from 'jsonwebtoken';
import db from '../database/models';
import Response from '../helpers/Response';
import modifyUserNotificationOpt from '../helpers/modifyUserNotificationOpt';

const { User } = db;
/** */
class NotificationOpt {
/**
 * @param {req} req
 * @param {res} res
 * @returns {object} object
 */
  static async modifyEmailNotificationOption(req, res) {
    const { emailOpt } = req.body;
    const { payload } = req.payload;
    const { email } = payload;
    const [, updatedUser] = await modifyUserNotificationOpt({ emailOpt }, email);
    const opt = emailOpt ? 'on' : 'off';

    const response = new Response(
      true,
      200,
      `email notification turned ${opt} successfully`,
      {
        id: updatedUser.id,
        email: updatedUser.email,
        emailOpt: updatedUser.emailOpt,
      }
    );

    return res.status(response.code).send(response);
  }

  /**
  * @param {req} req
  * @param {res} res
  * @returns {object} object
  */
  static async modifyInAppNotificationOption(req, res) {
    const { inAppOpt } = req.body;
    const { payload } = req.payload;
    const { email } = payload;
    const [, updatedUser] = await modifyUserNotificationOpt(
      { inAppOpt },
      email
    );
    const opt = inAppOpt ? 'on' : 'off';

    const response = new Response(
      true,
      200,
      `In-app notification turned ${opt}successfully`,
      {
        id: updatedUser.id,
        email: updatedUser.email,
        inAppOpt: updatedUser.inAppOpt
      }
    );

    return res.status(response.code).send(response);
  }
}

export default NotificationOpt;
