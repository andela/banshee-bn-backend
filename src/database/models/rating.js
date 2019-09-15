module.exports = (sequelize, DataTypes) => {
  const Rating = sequelize.define('Rating', {
    userId: DataTypes.UUID,
    accomodationId: DataTypes.UUID,
    ratingValue: DataTypes.INTEGER,
  },
  {
    indexes: [
      {
        unique: true,
        fields: ['userId', 'accomodationId'],
      },
    ],
  });
  Rating.associate = (models) => {
    Rating.belongsTo(models.Accomodation, {
      foreignKey: 'accomodationId',
    });
    Rating.belongsTo(models.User, {
      foreignKey: 'userId',
    });
  };
  return Rating;
};
