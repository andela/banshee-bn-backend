import Mailer from './Mailer';
import template from './emailTemplate';
/**
 * @class EmailNotifications
 */
class EmailNotifications {
  /**
   *
   * @param {object} req Request Object
   * @param {object} user User
   * @param {string} resetToken Reset Token
   * @returns {function} returns a function
   */
  static sendPasswordResetMail(req, user, resetToken) {
    const subject = 'Password Recovery';
    const emailBody = `
      <h3 class="username">Hello ${user.firstName},</h3>
      <p class="message">
      Someone(hopefully you), requested a password reset for your Barefoot-Nomad account. Kindly click on the button below to reset password.
      </p>
      <a class="btn" href="http://${req.headers.host}/${resetToken}">
        Reset password
      </a>`;
    const content = template(subject, emailBody);
    Mailer.sendMail(user.email, subject, content);
  }
}

export default EmailNotifications;
