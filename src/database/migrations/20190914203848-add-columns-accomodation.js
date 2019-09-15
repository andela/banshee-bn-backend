module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.addColumn(
      'Accomodations',
      'description',
      { type: Sequelize.TEXT }
    ),
    queryInterface.addColumn(
      'Accomodations',
      'addOns',
      { type: Sequelize.TEXT }
    ),
    queryInterface.addColumn(
      'Accomodations',
      'amenities',
      { type: Sequelize.ARRAY(Sequelize.TEXT) }
    ),
    queryInterface.addColumn(
      'Accomodations',
      'cost',
      { type: Sequelize.DECIMAL(10, 2) }
    )
  ]),

  down: (queryInterface) => Promise.all([
    queryInterface.removeColumn('Accomodations', 'description'),
    queryInterface.removeColumn('Accomodations', 'addOns'),
    queryInterface.removeColumn('Accomodations', 'amenities')
  ])
};
