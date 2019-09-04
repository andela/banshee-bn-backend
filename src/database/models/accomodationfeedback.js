module.exports = (sequelize, DataTypes) => {
  const AccomodationFeedback = sequelize.define('AccomodationFeedback', {
    reviews: DataTypes.STRING,
    likeDislike: DataTypes.ENUM('like', 'dislike'),
    accomodationId: DataTypes.UUID,
    tripId: DataTypes.UUID,
    userId: DataTypes.UUID
  }, {});
  AccomodationFeedback.associate = (models) => {
    AccomodationFeedback.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
    AccomodationFeedback.belongsTo(models.Accomodation, {
      foreignKey: 'accomodationId',
      as: 'accomodation',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
    AccomodationFeedback.belongsTo(models.Trip, {
      foreignKey: 'tripId',
      as: 'trip',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };
  return AccomodationFeedback;
};
