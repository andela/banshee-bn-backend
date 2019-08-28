module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";').then(() => queryInterface.createTable('Stops', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.DataTypes.UUID,
      defaultValue: Sequelize.literal('uuid_generate_v4()'),
    },
    destinationBranchId: {
      type: Sequelize.UUID,
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
      references: {
        model: 'Branches',
        key: 'id',
      }
    },
    accomodationId: {
      type: Sequelize.UUID,
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
      references: {
        model: 'Accomodations',
        key: 'id'
      }
    },
    tripId: {
      type: Sequelize.UUID,
      allowNull: false,
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
      references: {
        model: 'Trips',
        key: 'id'
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
  down: queryInterface => queryInterface.dropTable('Stops')
};
