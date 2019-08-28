module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";').then(() => queryInterface.createTable('Users', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.DataTypes.UUID,
      defaultValue: Sequelize.literal('uuid_generate_v4()'),
    },
    companyId: {
      allowNull: false,
      type: Sequelize.DataTypes.UUID,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      references: {
        model: 'Companies',
        key: 'id',
      },
    },
    firstName: {
      allowNull: false,
      type: Sequelize.STRING
    },
    lastName: {
      allowNull: false,
      type: Sequelize.STRING
    },
    email: {
      allowNull: false,
      unique: true,
      type: Sequelize.STRING
    },
    password: {
      allowNull: false,
      type: Sequelize.STRING
    },
    gender: {
      allowNull: false,
      type: Sequelize.ENUM('male', 'female')
    },
    dob: {
      allowNull: false,
      type: Sequelize.DATEONLY,
    },
    role: {
      allowNull: false,
      type: Sequelize.ENUM('owner', 'admin', 'staff'),
      defaultValue: 'staff'
    },
    status: {
      allowNull: false,
      type: Sequelize.ENUM('active', 'inactive', 'unverified'),
      defaultValue: 'unverified'
    },
    favorites: {
      allowNull: false,
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      set: (value) => {
        if (value === 'true') value = true;
        if (value === 'false') value = false;
        this.setDataValue('favorites', value);
      }
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn('now')
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn('now')
    }
  })),
  down: (queryInterface) => queryInterface.dropTable('Users')
};
