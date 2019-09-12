module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define('Booking', {
    accomodationId: DataTypes.UUID,
    roomId: DataTypes.UUID,
    occupiedBy: DataTypes.UUID,
    bookDate: DataTypes.DATEONLY
  }, {});
  Booking.associate = (models) => {
    Booking.belongsTo(models.Accomodation, {
      foreignKey: 'accomodationId',
      as: 'accomodation',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
    Booking.belongsTo(models.Room, {
      foreignKey: 'roomId',
      as: 'room',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
    Booking.belongsTo(models.User, {
      foreignKey: 'occupiedBy',
      as: 'user',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };
  return Booking;
};
