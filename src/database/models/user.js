module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      firstName: {
        allowNull: false,
        type: DataTypes.STRING
      },
      lastName: {
        allowNull: false,
        type: DataTypes.STRING
      },
      email: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING
      },
      gender: {
        allowNull: false,
        type: DataTypes.ENUM('male', 'female'),
        values: ['male', 'female']
      },
      dob: {
        allowNull: false,
        type: DataTypes.DATEONLY
      },
      role: {
        allowNull: false,
        type: DataTypes.ENUM('owner', 'admin', 'staff'),
        values: ['owner', 'admin', 'staff'],
        defaultValue: 'staff'
      },
      status: {
        allowNull: false,
        type: DataTypes.ENUM('active', 'inactive'),
        values: ['active', 'inactive'],
        defaultValue: 'active'
      },
      companyId: {
        allowNull: false,
        type: DataTypes.UUID
      }
    },
    {}
  );
  User.associate = (models) => {
    // associations can be defined here
    User.belongsTo(models.Company, {
      foreignKey: 'companyId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };
  return User;
};
