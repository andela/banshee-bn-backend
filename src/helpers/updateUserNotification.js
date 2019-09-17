import db from '../database/models';

const { Notification } = db;

const updateUserNotification = (recipients, notification) => Notification.update({
  recipients
}, {
  where: { id: notification.id }
});

export default updateUserNotification;
