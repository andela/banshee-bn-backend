import db from '../database/models';

const { Notification } = db;
/**
 * @param {object} tripId
 * @param {object} message
 * @param {object} recipients
 * @returns {object} object
 */
const addNotification = async (tripId, message, recipients) => {
  const newNotification = await Notification.create({ tripId, message, recipients });
  return newNotification;
};

export default addNotification;
