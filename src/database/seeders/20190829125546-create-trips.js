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
      id: 'ffe25dbe-29ea-4759-8468-ed116f6739df',
      type: 'multiple',
      startBranchId: 'ffe35dbe-29ea-4759-8461-ed116f6739dd',
      userId: '91542e6f-94bc-4e80-a667-586fb0752f23',
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
    },
    {
      id: '72a5c8f5-27eb-4623-b6f4-09f77cc871f3',
      type: 'oneway',
      startBranchId: '3dd3b34a-7554-425e-a688-36afda199614',
      userId: '91542e6f-94bc-4e80-a667-586fb0752f24',
      tripDate: '2019-02-17',
      reason: 'for holiday',
      status: 'pending'
    },
    {
      id: 'ba3f6b93-f09e-49a4-bb28-c65555250bc1',
      type: 'return',
      startBranchId: '3dd3b34a-7554-425e-a688-36afda199614',
      userId: '91542e6f-94bc-4e80-a667-586fb0752f24',
      tripDate: '2019-02-17',
      returnDate: '2019-02-23',
      reason: 'for holiday',
      status: 'pending'
    },
    {
      id: 'db17ddb2-a6ba-49f5-9715-e0e81eb7720a',
      type: 'multiple',
      startBranchId: '3dd3b34a-7554-425e-a688-36afda199614',
      userId: '91542e6f-94bc-4e80-a667-586fb0752f24',
      tripDate: '2019-02-17',
      reason: 'for holiday',
      status: 'pending'
    },
    {
      id: '4ae4fef9-8e5e-4d2a-879a-a0425cd3d5aa',
      type: 'oneway',
      startBranchId: '3dd3b34a-7554-425e-a688-36afda199614',
      userId: '91542e6f-94bc-4e80-a667-586fb0752f24',
      tripDate: '2019-02-17',
      reason: 'for holiday',
      status: 'approved'
    },
    {
      id: 'ff10015c-1624-4490-9b1f-1a2cf0ee4493',
      type: 'oneway',
      startBranchId: '3dd3b34a-7554-425e-a688-36afda199614',
      userId: '91542e6f-94bc-4e80-a667-586fb0752f23',
      tripDate: '2019-09-11',
      returnDate: null,
      reason: 'for meeting',
      status: 'approved'
    },
    {
      id: 'ff10015c-1624-4490-9b1f-1a2cf0ee4492',
      type: 'oneway',
      startBranchId: '3dd3b34a-7554-425e-a688-36afda199614',
      userId: '91542e6f-94bc-4e80-a667-586fb0752f23',
      tripDate: '2019-09-15',
      returnDate: null,
      reason: 'meeting with company owner',
      status: 'pending'
    },
  ]),
  down: queryInterface => queryInterface.bulkDelete('Trips', null, {})
};
