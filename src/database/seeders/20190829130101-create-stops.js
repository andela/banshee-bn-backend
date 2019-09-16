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
      accomodationId: '3dd3b34a-7554-425e-a688-36afda199619',
      tripId: 'ffe25dbe-29ea-4759-8462-ed116f6739df'
    },
    {
      id: '6790ae28-d184-4228-add5-0b2c6982efef',
      destinationBranchId: '3dd3b34a-7554-455e-a688-36afda199624',
      accomodationId: '3dd3b34a-7554-425e-c688-36afda199619',
      tripId: 'ffe25dbe-49ea-4759-8462-ed116f6749df'
    },
    {
      id: 'd3d9c312-6ac0-4f9a-a371-efa587e8f56c',
      destinationBranchId: '3dd3b34a-7554-455e-a688-36afda199624',
      accomodationId: '3dd3b34a-7554-425e-c688-36afda199619',
      tripId: '72a5c8f5-27eb-4623-b6f4-09f77cc871f3'
    },
    {
      id: 'a041b2c9-eaba-4d8d-87b1-378d557b2678',
      destinationBranchId: '3dd3b34a-7554-455e-a688-36afda199624',
      accomodationId: '3dd3b34a-7554-425e-c688-36afda199619',
      tripId: 'ba3f6b93-f09e-49a4-bb28-c65555250bc1'
    },
    {
      id: '13020a26-5840-4758-93bd-9da91920d1e8',
      destinationBranchId: '3dd3b34a-7554-455e-a688-36afda199624',
      accomodationId: '3dd3b34a-7554-425e-c688-36afda199619',
      tripId: 'db17ddb2-a6ba-49f5-9715-e0e81eb7720a'
    },
    {
      id: '79d09466-ee4f-4e96-a38b-009e4595121e',
      destinationBranchId: '1bf9f868-2a59-45ae-8f68-ad68095ca0ac',
      accomodationId: '3dd3b34a-7554-425e-c688-36afda199619',
      tripId: 'db17ddb2-a6ba-49f5-9715-e0e81eb7720a'
    },
    {
      id: '0467cec6-44cb-456a-8b08-d53f925f3239',
      destinationBranchId: '7b717bff-9202-4c44-9848-80ec876b6fdc',
      accomodationId: '3dd3b34a-7554-425e-c688-36afda199619',
      tripId: '0467cec6-44cb-456a-8b08-d53f925f3239'
    },
     {
      id: '2d1ce275-f5c1-45c3-bed9-4cbd2ffa4769',
      destinationBranchId: 'dbbe4992-4091-4914-a266-38ecdcf42083',
      accomodationId: '3dd3b34a-7554-425e-c688-36afda199619',
      tripId: 'db17ddb2-a6ba-49f5-9715-e0e81eb7720a'
    },
    {
      id: '3789518f-93b0-4f97-9cdf-1ac5a32cf5c2',
      destinationBranchId: '7b717bff-9202-4c44-9848-80ec876b6fdc',
      accomodationId: 'b1a81334-fbf4-4160-83bf-e58f9063f7cf',
      tripId: 'db17ddb2-a6ba-49f5-9715-e0e81eb7720a'
    },
  ]),
  down: queryInterface => queryInterface.bulkDelete('Stops', null, {})
};
