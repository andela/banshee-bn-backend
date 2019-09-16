module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    tripId: DataTypes.UUID,
    userId: DataTypes.UUID,
    body: DataTypes.TEXT,
    deleted: DataTypes.BOOLEAN
  }, {});
  Comment.associate = (models) => {
    // associations can be defined here
    Comment.belongsTo(models.Trip, {
      foreignKey: 'tripId',
      as: 'trip',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
    Comment.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };
  return Comment;
};
