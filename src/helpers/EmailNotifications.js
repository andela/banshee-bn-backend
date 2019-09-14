import mailer from './Mailer';
import template from './emailTemplate';
import templateIndex from './template';
import newTripRequestEmailContent from './template/newTripRequestEmailContent';
import { newTripStyle } from './template/styles';

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
    mailer.sendMail(user.email, subject, content);
  }

  /**
   * @param {*} email
   * @param {*} link
   * @param {*} name
   * @returns {*} sends an email to a new user
   */
  static signupEmail(email, link, name) {
    const title = 'Welcome to Barefoot Nomad';
    const body = `<p>Dear ${name},</p>
    <p class="message">We are thrilled to have you.</p>
    <p class="message">Click the link below to confirm your registration</p>
        <a class="btn" href="${link}">Confirm email</a>`;
    const message = template(title, body);
    mailer.sendMail(email, title, message);
  }

  /**
 * @param {string} email
 * @param {string} title
 * @param {object} data
 * @returns {*} sends an email to user(s) when new
 */
  static sendNewTrip(email, title, data) {
    const content = newTripRequestEmailContent(data);
    const message = templateIndex(newTripStyle, content);
    mailer.sendMail(email, title, message);
  }
}

export default EmailNotifications;
