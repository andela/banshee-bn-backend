module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    'Users',
    {
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.STRING,
      gender: DataTypes.STRING
    },
    {}
  );
  Users.associate = () => {
    // associations can be defined here
  };
  return Users;
};
