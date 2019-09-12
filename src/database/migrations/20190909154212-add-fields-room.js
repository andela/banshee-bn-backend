module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.addColumn(
      'Rooms',
      'booked',
      {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        set: (value) => {
          if (value === 'true') value = true;
          if (value === 'false') value = false;
          this.setDataValue('booked', value);
        }
      }
    ),
  ]),

  down: queryInterface => Promise.all([
    queryInterface.removeColumn('Rooms', 'booked'),
  ])
};
