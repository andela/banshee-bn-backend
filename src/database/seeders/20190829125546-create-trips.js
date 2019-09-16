import timeframe from '../../../test/mockData/mockDate';
import moment from 'moment';
module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Trips', [
    {
      id: 'ffe25dbe-29ea-4759-8461-ed116f6739df',
      type: 'oneway',
      startBranchId: 'ffe35dbe-29ea-4759-8461-ed116f6739dd',
      userId: 'ffe25dbe-29ea-4759-8461-ed116f6739dd',
      tripDate: timeframe.lastXDays(10).startDate,
      returnDate: '2019-02-23',
      reason: 'for holiday',
      status: 'pending',
      createdAt: timeframe.lastXDays(12).startDate
    },
    {
      id: 'ffe25dbe-29ea-4759-8468-ed116f6739df',
      type: 'oneway',
      startBranchId: 'ffe35dbe-29ea-4759-8461-ed116f6739dd',
      userId: '91542e6f-94bc-4e80-a667-586fb0752f23',
      tripDate: timeframe.lastXDays(0).startDate,
      returnDate: '2019-02-23',
      reason: 'for holiday',
      status: 'pending',
      createdAt: timeframe.lastXDays(1).startDate
    },
    {
      id: 'ffe25dbe-29ea-4759-8462-ed116f6739df',
      type: 'return',
      startBranchId: 'ffe35dbe-29ea-4759-8461-ed116f6739dd',
      userId: '91542e6f-94bc-4e80-a667-586fb0752f23',
      tripDate: timeframe.lastXDays(10).startDate,
      returnDate: '2019-09-23',
      reason: 'for work',
      status: 'approved',
      createdAt: timeframe.lastXDays(12).startDate
    },
    {
      id: 'ffe25dbe-29ea-4759-8462-ed116f6749df',
      type: 'multiple',
      startBranchId: 'efe35dbe-29ea-4759-8461-ed116f6739dd',
      userId: '91542e6f-94bc-4e80-a667-586fb0752f24',
      tripDate: '2019-09-01',
      returnDate: '2019-09-21',
      reason: 'to meet with clients',
      status: 'rejected',
      createdAt: timeframe.lastXDays(12).startDate
    },
    {
      id: 'ffe25dbe-49ea-4759-8462-ed116f6749df',
      type: 'oneway',
      startBranchId: '3dd3b34a-7554-425e-a688-36afda199614',
      userId: '91542e6f-94bc-4e80-a667-586fb0752f25',
      tripDate: timeframe.lastXDays(23).startDate,
      returnDate: null,
      reason: 'to meet with clients',
      status: 'approved',
      createdAt: timeframe.lastXDays(20).startDate
    },
    {
      id: '72a5c8f5-27eb-4623-b6f4-09f77cc871f3',
      type: 'oneway',
      startBranchId: '3dd3b34a-7554-425e-a688-36afda199614',
      userId: '91542e6f-94bc-4e80-a667-586fb0752f24',
      tripDate: timeframe.lastXDays(14).startDate,
      returnDate: null,
      reason: 'for holiday',
      status: 'pending',
      createdAt: timeframe.lastXDays(16).startDate
    },
    {
      id: 'ba3f6b93-f09e-49a4-bb28-c65555250bc1',
      type: 'return',
      startBranchId: '3dd3b34a-7554-425e-a688-36afda199614',
      userId: '91542e6f-94bc-4e80-a667-586fb0752f24',
      tripDate: timeframe.lastXDays(7).startDate,
      returnDate: '2019-12-23',
      reason: 'for holiday',
      status: 'pending',
      createdAt: timeframe.lastXDays(9).startDate
    },
    {
      id: 'db17ddb2-a6ba-49f5-9715-e0e81eb7720a',
      type: 'multiple',
      startBranchId: '3dd3b34a-7554-425e-a688-36afda199614',
      userId: '91542e6f-94bc-4e80-a667-586fb0752f24',
      tripDate: timeframe.lastXDays(2).startDate,
      reason: 'for holiday',
      status: 'pending',
      createdAt: timeframe.lastXDays(3).startDate
    },
    {
      id: '4ae4fef9-8e5e-4d2a-879a-a0425cd3d5aa',
      type: 'oneway',
      startBranchId: '3dd3b34a-7554-425e-a688-36afda199614',
      userId: '91542e6f-94bc-4e80-a667-586fb0752f24',
      tripDate: timeframe.lastXDays(2).startDate,
      reason: 'for holiday',
      status: 'approved',
      createdAt: timeframe.lastXDays(5).startDate
    },
    {
      id: '1b91c1b4-3dbf-4412-ac59-252eb8d0b689',
      type: 'oneway',
      startBranchId: '3dd3b34a-7554-425e-a688-36afda199614',
      userId: '91542e6f-94bc-4e80-a667-586fb0752f24',
      tripDate: timeframe.nextXDay(27),
      reason: 'for holiday',
      status: 'approved',
      createdAt: timeframe.lastXDays(2).startDate
    },
    {
      id: '0467cec6-44cb-456a-8b08-d53f925f3239',
      type: 'oneway',
      startBranchId: '1404d644-fa2e-49a9-982f-eec3afeb5c0d',
      userId: 'f30f431e-0d60-47cd-ae8a-5864c5246d98',
      tripDate: timeframe.nextXDay(2),
      reason: 'for holiday',
      status: 'approved',
      createdAt: timeframe.lastXDays(30).startDate
    },
    {
      id: 'c1313777-d50d-4fa6-bd9d-807c25ceef41',
      type: 'return',
      startBranchId: '1404d644-fa2e-49a9-982f-eec3afeb5c0d',
      userId: '54cef27e-a449-4f00-8a5c-d103be93ebb0',
      tripDate: timeframe.nextXDay(0),
      reason: 'for holiday',
      status: 'approved',
      createdAt: timeframe.lastXDays(14).startDate
    },
    {
      id: 'ff10015c-1624-4490-9b1f-1a2cf0ee4493',
      type: 'oneway',
      startBranchId: '3dd3b34a-7554-425e-a688-36afda199614',
      userId: '91542e6f-94bc-4e80-a667-586fb0752f23',
      tripDate: '2019-09-11',
      returnDate: null,
      reason: 'for meeting',
      status: 'approved',
      createdAt: timeframe.lastXDays(14).startDate
    },
    {
      id: 'ff10015c-1624-4490-9b1f-1a2cf0ee4492',
      type: 'oneway',
      startBranchId: '3dd3b34a-7554-425e-a688-36afda199614',
      userId: '91542e6f-94bc-4e80-a667-586fb0752f23',
      tripDate: '2019-09-15',
      returnDate: null,
      reason: 'meeting with company owner',
      status: 'pending',
      createdAt: timeframe.lastXDays(14).startDate
    }
  ]),
  down: queryInterface => queryInterface.bulkDelete('Trips', null, {})
};
