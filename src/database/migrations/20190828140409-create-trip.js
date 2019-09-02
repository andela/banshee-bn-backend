
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";').then(() => queryInterface.createTable('Trips', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.DataTypes.UUID,
      defaultValue: Sequelize.literal('uuid_generate_v4()'),
    },
    type: {
      type: Sequelize.ENUM('oneway', 'return', 'multiple'),
      allowNull: false,
    },
    userId: {
      type: Sequelize.UUID,
      allowNull: false,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    status: {
      allowNull: false,
      type: Sequelize.ENUM('pending', 'approved', 'rejected'),
      defaultValue: 'pending',
    },
    startBranchId: {
      type: Sequelize.UUID,
      allowNull: false,
    },
    reason: {
      type: Sequelize.STRING,
      allowNull: false
    },
    tripDate: {
      type: Sequelize.DATE,
      allowNull: false
    },
    returnDate: {
      type: Sequelize.DATE,
      allowNull: true
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
  down: queryInterface => queryInterface.dropTable('Trips')
};
