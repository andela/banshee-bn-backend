module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Stops', [
    {
      id: '6190ae78-d184-4258-add5-0b2c6982efef',
      destinationBranchId: '3dd3b34a-7554-425e-a688-36afda199614',
      accomodationId: '3dd3b34a-7554-425e-a688-36afda199619',
      tripId: 'ffe25dbe-29ea-4759-8461-ed116f6739df'
    },
    {
      id: '6190ae28-d184-4258-add5-0b2c6982efef',
      destinationBranchId: '3dd3b34a-7554-455e-a688-36afda199624',
      accomodationId: '3dd3b34a-7554-425e-c688-36afda199619',
      tripId: 'ffe25dbe-29ea-4759-8462-ed116f6739df'
    },
    {
      id: '6790ae28-d184-4228-add5-0b2c6982efef',
      destinationBranchId: '3dd3b34a-7554-455e-a688-36afda199624',
      accomodationId: '3dd3b34a-7554-425e-c688-36afda199619',
      tripId: 'ffe25dbe-49ea-4759-8462-ed116f6749df'
    }
  ]),
  down: queryInterface => queryInterface.bulkDelete('Stops', null, {})
};
