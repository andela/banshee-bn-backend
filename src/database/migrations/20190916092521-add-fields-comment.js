module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.addColumn(
      'Comments',
      'deleted',
      {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        set: (value) => {
          if (value === 'true') value = true;
          if (value === 'false') value = false;
          this.setDataValue('deleted', value);
        }
      }
    ),
  ]),

  down: queryInterface => Promise.all([
    queryInterface.removeColumn('Comments', 'deleted'),
  ])
};
