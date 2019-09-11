module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      gender: DataTypes.ENUM('male', 'female'),
      dob: DataTypes.DATEONLY,
      role: DataTypes.ENUM('super admin', 'travel admin', 'travel team member', 'manager', 'requester', 'staff'),
      status: DataTypes.ENUM('active', 'inactive', 'unverified'),
      companyId: DataTypes.UUID,
      favorites: DataTypes.BOOLEAN
    },
    {}
  );
  User.associate = (models) => {
    User.hasMany(models.Trip, {
      foreignKey: 'userId',
      as: 'trip',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
    User.hasMany(models.Comment, {
      foreignKey: 'userId',
      as: 'comments',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
    User.belongsTo(models.Company, {
      foreignKey: 'companyId',
      as: 'company',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };
  return User;
};
