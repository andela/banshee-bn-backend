module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define('Company', {
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    code: DataTypes.STRING,
    owner: DataTypes.STRING
  }, {});
  Company.associate = (models) => {
    Company.hasMany(models.Location, {
      foreignKey: 'companyId',
      as: 'location',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
    Company.hasMany(models.User, {
      foreignKey: 'companyId',
      as: 'user',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };
  return Company;
};
