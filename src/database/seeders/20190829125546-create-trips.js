module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Trips', [
    {
      id: 'ffe25dbe-29ea-4759-8461-ed116f6739df',
      type: 'oneway',
      startBranchId: 'ffe35dbe-29ea-4759-8461-ed116f6739dd',
      userId: 'ffe25dbe-29ea-4759-8461-ed116f6739dd',
      tripDate: '2019-02-17',
      returnDate: '2019-02-23',
      reason: 'for holiday',
      status: 'pending'
    },
    {
      id: 'ffe25dbe-29ea-4759-8462-ed116f6739df',
      type: 'return',
      startBranchId: 'ffe35dbe-29ea-4759-8461-ed116f6739dd',
      userId: '91542e6f-94bc-4e80-a667-586fb0752f23',
      tripDate: '2019-08-30',
      returnDate: '2019-09-23',
      reason: 'for work',
      status: 'approved'
    },
    {
      id: 'ffe25dbe-29ea-4759-8462-ed116f6749df',
      type: 'multiple',
      startBranchId: 'efe35dbe-29ea-4759-8461-ed116f6739dd',
      userId: '91542e6f-94bc-4e80-a667-586fb0752f24',
      tripDate: '2019-09-01',
      returnDate: '2019-09-21',
      reason: 'to meet with clients',
      status: 'rejected'
    },
    {
      id: 'ffe25dbe-49ea-4759-8462-ed116f6749df',
      type: 'oneway',
      startBranchId: '3dd3b34a-7554-425e-a688-36afda199614',
      userId: '91542e6f-94bc-4e80-a667-586fb0752f25',
      tripDate: '2019-10-01',
      returnDate: null,
      reason: 'to meet with clients',
      status: 'approved'
    }
  ]),
  down: queryInterface => queryInterface.bulkDelete('Trips', null, {})
};
