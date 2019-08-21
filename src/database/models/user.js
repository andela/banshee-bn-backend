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
      role: DataTypes.ENUM('owner', 'admin', 'staff'),
      status: DataTypes.ENUM('active', 'inactive'),
      companyId: DataTypes.UUID
    },
    {}
  );
  User.associate = (models) => {
    // associations can be defined here

  };
  return User;
};
