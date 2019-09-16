
module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define('Notification', {
    message: DataTypes.STRING,
    tripId: DataTypes.UUID,
    recipients: DataTypes.ARRAY(DataTypes.TEXT)
  }, {});
  Notification.associate = function (models) {
    // associations can be defined here
  };
  return Notification;
};
