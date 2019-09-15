module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";').then(() => queryInterface.createTable('Suppliers', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.DataTypes.UUID,
      defaultValue: Sequelize.literal('uuid_generate_v4()'),
    },
    companyId: {
      allowNull: false,
      type: Sequelize.DataTypes.UUID,
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE',
      references: {
        model: 'Companies',
        key: 'id',
      },
    },
    managerId: {
      allowNull: false,
      type: Sequelize.DataTypes.UUID,
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE',
      references: {
        model: 'Users',
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
  down: (queryInterface) => queryInterface.dropTable('Suppliers')
};
