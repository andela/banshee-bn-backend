import Response from '../helpers/Response';
import modifyUserNotificationOpt from '../helpers/modifyUserNotificationOpt';
import removeUserNotification from '../helpers/removeUserNotification';
import updateUserNotification from '../helpers/updateUserNotification';

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

  /**
   * @description Mark a users notification as read
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {Object} Object
   */
  static async readAllNotifications(req, res) {
    const { payload: { email } } = req.payload;
    try {
      const notifications = await removeUserNotification(email);
      if (notifications.length < 1) {
        return res.status(200).json(
          new Response(true, 200, 'No notifications found')
        );
      }

      notifications.forEach(async (notification) => {
        const recipients = notification.recipients.filter((emailInArray) => emailInArray !== email);
        await updateUserNotification(recipients, notification);
      });

      return res.status(200).json(
        new Response(true, 200, 'Successfully mark all user notifications as read', notifications)
      );
    } catch (error) {
      return res.status(500).json(
        new Response(false, 500, error.message)
      );
    }
  }
}

export default NotificationOpt;
