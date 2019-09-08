module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.addColumn(
      'Accomodations',
      'imgurl',
      {
        type: Sequelize.STRING
      }
    ),
    queryInterface.addColumn(
      'Accomodations',
      'address',
      {
        type: Sequelize.STRING
      }
    ),
  ]),

  down: queryInterface => Promise.all([
    queryInterface.removeColumn('Accomodations', 'imgurl'),
    queryInterface.removeColumn('Accomodations', 'address'),
  ])
};
