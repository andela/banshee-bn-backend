module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Comments', [
    {
      id: 'ffe25dbe-29ea-4755-8461-ed116f6739df',
      tripId: 'ffe25dbe-29ea-4759-8461-ed116f6739df',
      userId: 'ffe25dbe-29ea-4759-8461-ed116f6739dd',
      body: 'Robert Mugabe is no more'
    },
    {
      id: 'ffe25dbe-29ea-4751-8461-ed116f6739df',
      tripId: 'ffe25dbe-29ea-4759-8461-ed116f6739df',
      userId: 'ffe25dbe-29ea-4759-8461-ed116f6739dd',
      body: 'There is free food at the cafeteria'
    },
  ]),

  down: queryInterface => queryInterface.bulkDelete('Comments', null, {})
};
