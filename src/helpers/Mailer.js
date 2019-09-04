import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
/**
 * @class Mailer
 */
class Mailer {
  /**
   *
   * @param {object} to Recipient Email
   * @param {string} subject Email Subject
   * @param {string} content Email Content
   * @returns {function} returns a function
   */
  static sendMail(to, subject, content) {
    const message = {
      from: process.env.EMAIL,
      to,
      html: content,
      subject
    };
    if (process.env.NODE_ENV !== 'test') {
      return sgMail.send(message);
    }
  }
}

export default Mailer;
