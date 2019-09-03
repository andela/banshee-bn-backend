module.exports = (sequelize, DataTypes) => {
  const Branch = sequelize.define('Branch', {
    name: DataTypes.STRING,
    locationId: DataTypes.UUID
  }, {});
  Branch.associate = (models) => {
    Branch.belongsTo(models.Location, {
      foreignKey: 'locationId',
      as: 'location',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
    Branch.hasMany(models.Trip, {
      foreignKey: 'startBranchId',
      as: 'trip',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
    Branch.hasMany(models.Accomodation, {
      foreignKey: 'branchId',
      as: 'accomodation',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
    Branch.hasMany(models.Stop, {
      foreignKey: 'destinationBranchId',
      as: 'stop',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };
  return Branch;
};
