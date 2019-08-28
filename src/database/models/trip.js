module.exports = (sequelize, DataTypes) => {
  const Trip = sequelize.define('Trip', {
    type: DataTypes.STRING,
    startlocationId: DataTypes.UUID,
    userId: DataTypes.UUID,
    tripDate: DataTypes.DATEONLY,
    returnDate: DataTypes.DATEONLY,
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
      foreignKey: 'startlocationId',
      as: 'branch',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };
  return Trip;
};
