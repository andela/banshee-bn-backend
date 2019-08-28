module.exports = (sequelize, DataTypes) => {
  const Trip = sequelize.define('Trip', {
    type: DataTypes.STRING,
    startBranchId: DataTypes.UUID,
    userId: DataTypes.UUID,
    tripDate: DataTypes.DATEONLY,
    returnDate: DataTypes.DATEONLY,
    reason: DataTypes.STRING,
    status: DataTypes.ENUM('pending', 'approved', 'rejected')
  }, {});
  Trip.associate = (models) => {
    Trip.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'

    });
    Trip.hasMany(models.Stop, {
      foreignKey: 'tripId',
      as: 'stop',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
    Trip.belongsTo(models.Branch, {
      foreignKey: 'startBranchId',
      as: 'branch',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      sourceKey: 'startBranchId'
    });
  };
  return Trip;
};
