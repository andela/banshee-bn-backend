'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Users', 'emailOpt', {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }),
      queryInterface.addColumn('Users', 'inAppOpt', {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      })
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Users', 'emailOpt', {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false
      }),
      queryInterface.removeColumn('Users', 'inAppOpt', {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false
      })
    ]);
  }
};
