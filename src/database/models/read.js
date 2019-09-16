'use strict';
module.exports = (sequelize, DataTypes) => {
  const Read = sequelize.define('Read', {
    notificationId: DataTypes.UUID,
    userId: DataTypes.UUID,
    read: DataTypes.BOOLEAN
  }, {});
  Read.associate = function(models) {
    // associations can be defined here
    Read.belongsTo(models.Notification, {
      foreignKey: 'notificationId',
      as: 'notifications',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
    Read.belongsTo(models.Notification, {
      foreignKey: 'userId',
      as: 'users',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };
  return Read;
};