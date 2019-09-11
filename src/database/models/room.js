module.exports = (sequelize, DataTypes) => {
  const Room = sequelize.define('Room', {
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    accomodationId: DataTypes.UUID
  }, {});
  Room.associate = models => {
    Room.belongsTo(models.Accomodation, {
      foreignKey: 'accomodationId',
      as: 'accomodation',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };
  return Room;
};
