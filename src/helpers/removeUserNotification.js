import { Op } from 'sequelize';
import db from '../database/models';

const { Notification } = db;

/**
 * @description Get and remove a users notifications
 * @param {String} email
 * @returns {String} notifications
 */

const removeUsersNotification = email => Notification.findAll({
  where: {
    recipients: {
      [Op.contains]: [email]
    }
  },
  attributes: ['id', 'recipients'],
  raw: true
});

export default removeUsersNotification;
