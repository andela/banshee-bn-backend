module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define('Location', {
    companyId: DataTypes.UUID,
    country: DataTypes.STRING,
    city: DataTypes.STRING
  }, {});
  Location.associate = (models) => {
    Location.belongsTo(models.Company, {
      foreignKey: 'companyId',
      as: 'company',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
    Location.hasMany(models.Branch, {
      foreignKey: 'locationId',
      as: 'branch',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };
  return Location;
};
