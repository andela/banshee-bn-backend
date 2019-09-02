module.exports = (sequelize, DataTypes) => {
  const Accomodation = sequelize.define('Accomodation', {
    name: DataTypes.STRING,
    branchId: DataTypes.UUID,
    capacity: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {});
  Accomodation.associate = (models) => {
    Accomodation.belongsTo(models.Branch, {
      foreignKey: 'branchId',
      as: 'branch',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
    Accomodation.hasMany(models.Stop, {
      foreignKey: 'accomodationId',
      as: 'stop',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };
  return Accomodation;
};
