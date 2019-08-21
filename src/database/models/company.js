module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define('Company', {
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    code: DataTypes.STRING,
    owner: DataTypes.STRING
  }, {});
  Company.associate = (models) => {
    // associations can be defined here
    Company.hasMany(models.User, {
      foreignKey: 'companyId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };
  return Company;
};
