module.exports = (sequelize, DataTypes) => {
  const Stop = sequelize.define('Stop', {
    destinationBranchId: DataTypes.UUID,
    accomodationId: DataTypes.UUID,
    tripId: DataTypes.UUID,
  }, {});
  Stop.associate = (models) => {
    Stop.belongsTo(models.Trip, {
      foreignKey: 'tripId',
      as: 'trip',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
    Stop.belongsTo(models.Accomodation, {
      foreignKey: 'accomodationId',
      as: 'accomodation',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
    Stop.belongsTo(models.Branch, {
      foreignKey: 'destinationBranchId',
      as: 'branch',
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    });
  };
  return Stop;
};
