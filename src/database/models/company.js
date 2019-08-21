module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define('Company', {
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    address: {
      allowNull: false,
      type: DataTypes.STRING
    },
    code: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING
    },
    owner: {
      allowNull: false,
      type: DataTypes.STRING
    }
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
