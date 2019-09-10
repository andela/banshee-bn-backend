const oneWayTrip = [
  {
    id: '72a5c8f5-27eb-4623-b6f4-09f77cc871f3',
    from: '1bf9f868-2a59-45ae-8f68-ad68095ca0ac',
    reason: 'Things have changed',
    destinations: [
      {
        id: 'd3d9c312-6ac0-4f9a-a371-efa587e8f56c',
        to: '3dd3b34a-7554-425e-a688-36afda199614',
        accomodation: '3dd3b34a-7554-425e-a688-36afda199619'
      }
    ]
  },
  {
    id: '72a5c8f5-27eb-4623-b6f4-09f77cc871f3',
    from: '1bf9f868-2a59-45ae-8f68-ad68095ca020', // invalid
    reason: 'Things have changed',
    destinations: [
      {
        id: 'd3d9c312-6ac0-4f9a-a371-efa587e8f56c',
        to: '3dd3b34a-7554-425e-a688-36afda199614',
        accomodation: '3dd3b34a-7554-425e-a688-36afda199619'
      }
    ]
  },
  {
    id: '72a5c8f5-27eb-4623-b6f4-09f77cc871f3',
    from: '1bf9f868-2a59-45ae-8f68-ad68095ca0ac',
    reason: 'Things have changed',
    destinations: [
      {
        id: 'd3d9c312-6ac0-4f9a-a371-efa587e8f56c',
        to: '3dd3b34a-7554-425e-a688-36afda199620', // invalid
        accomodation: '3dd3b34a-7554-425e-a688-36afda199619'
      }
    ]
  },
  {
    id: '72a5c8f5-27eb-4623-b6f4-09f77cc871f3',
    from: '3dd3b34a-7554-425e-a688-36afda199614', // equal to destination
    reason: 'Things have changed',
    destinations: [
      {
        id: 'd3d9c312-6ac0-4f9a-a371-efa587e8f56c',
        to: '3dd3b34a-7554-425e-a688-36afda199614',
        accomodation: '3dd3b34a-7554-425e-a688-36afda199619'
      }
    ]
  },
  {
    id: '72a5c8f5-27eb-4623-b6f4-09f77cc871f3',
    from: '1bf9f868-2a59-45ae-8f68-ad68095ca0ac',
    reason: 'Things have changed',
    destinations: [
      {
        id: 'd3d9c312-6ac0-4f9a-a371-efa587e8f56c',
        to: '3dd3b34a-7554-425e-a688-36afda199614',
        accomodation: '3dd3b34a-7554-425e-a688-36afda199620' // invalid
      }
    ]
  },
  {
    id: '72a5c8f5-27eb-4623-b6f4-09f77cc871f3',
    from: '1bf9f868-2a59-45ae-8f68-ad68095ca0ac',
    reason: 'Things have changed',
    destinations: [
      {
        id: 'f6bd6d96-9760-4d2a-8cc4-f95279dd6436', // Does not exist
        to: '3dd3b34a-7554-425e-a688-36afda199614',
        accomodation: '3dd3b34a-7554-425e-a688-36afda199619'
      }
    ]
  },
  {
    id: '72a5c8f5-27eb-4623-b6f4-09f77cc871f3',
    from: '1bf9f868-2a59-45ae-8f68-ad68095ca0ac',
    departureDate: 'invalid', // invalid
    reason: 'Things have changed',
    destinations: [
      {
        id: 'd3d9c312-6ac0-4f9a-a371-efa587e8f56c',
        to: '3dd3b34a-7554-425e-a688-36afda199614',
        accomodation: '3dd3b34a-7554-425e-a688-36afda199619'
      }
    ]
  },
  {
    id: '72a5c8f5-27eb-4623-b6f4-09f77cc871f3',
    from: '1bf9f868-2a59-45ae-8f68-ad68095ca0ac',
    reason: '', // empty
    destinations: [
      {
        id: 'd3d9c312-6ac0-4f9a-a371-efa587e8f56c',
        to: '3dd3b34a-7554-425e-a688-36afda199614',
        accomodation: '3dd3b34a-7554-425e-a688-36afda199619'
      }
    ]
  },
  {
    id: '72a5c8f5-27eb-4623-b6f4-09f77cc871f3',
    from: '1bf9f868-2a59-45ae-8f68-ad68095ca0ac',
    reason: 'Things have changed',
    destinations: [
      {
        id: 'f6bd6d96-9760-4d2a-8cc4-f95279dd643', // Invalid id
        to: '3dd3b34a-7554-425e-a688-36afda199614',
        accomodation: '3dd3b34a-7554-425e-a688-36afda199619'
      }
    ]
  }
];

const returnTrip = [
  {
    id: 'ba3f6b93-f09e-49a4-bb28-c65555250bc1',
    from: '1bf9f868-2a59-45ae-8f68-ad68095ca0ac',
    departureDate: '2000-02-02',
    returnDate: 'invalid', // invalid
    reason: 'Return trip has changed',
    destinations: [
      {
        id: 'd3d9c312-6ac0-4f9a-a371-efa587e8f56c',
        to: '3dd3b34a-7554-425e-a688-36afda199614',
        accomodation: '3dd3b34a-7554-425e-a688-36afda199619'
      }
    ]
  },
  {
    id: 'ba3f6b93-f09e-49a4-bb28-c65555250bc1',
    from: '1bf9f868-2a59-45ae-8f68-ad68095ca0ac',
    departureDate: '2020-02-02',
    returnDate: '2020-02-02', // same as departure
    reason: 'Return trip has changed',
    destinations: [
      {
        id: 'd3d9c312-6ac0-4f9a-a371-efa587e8f56c',
        to: '3dd3b34a-7554-425e-a688-36afda199614',
        accomodation: '3dd3b34a-7554-425e-a688-36afda199619'
      }
    ]
  },
  {
    id: 'ba3f6b93-f09e-49a4-bb28-c65555250bc1',
    from: '1bf9f868-2a59-45ae-8f68-ad68095ca0ac',
    departureDate: '2020-02-02',
    returnDate: '2020-02-03',
    reason: 'Return trip has changed',
    destinations: [
      {
        id: 'a041b2c9-eaba-4d8d-87b1-378d557b2678',
        to: '3dd3b34a-7554-425e-a688-36afda199614',
        accomodation: '3dd3b34a-7554-425e-a688-36afda199619'
      }
    ]
  },
  {
    id: 'ba3f6b93-f09e-49a4-bb28-c65555250bc1',
    from: '1bf9f868-2a59-45ae-8f68-ad68095ca0ac',
    departureDate: '2020-02-02',
    returnDate: '2020-02-03',
    reason: 'Return trip has changed',
  }
];

const nonExistentTrip = {
  id: '254d4010-eb20-440e-8d22-4a0d471cb44f',
};

const closedTrip = {
  id: '4ae4fef9-8e5e-4d2a-879a-a0425cd3d5aa',
};

const multiTrip = [
  {
    id: 'db17ddb2-a6ba-49f5-9715-e0e81eb7720a',
    from: '1bf9f868-2a59-45ae-8f68-ad68095ca0ac',
    departureDate: '2020-02-02',
    reason: 'Things have changed',
    destinations: [
      {
        id: '13020a26-5840-4758-93bd-9da91920d1e8',
        to: '3dd3b34a-7554-425e-a688-36afda199614',
        accomodation: '3dd3b34a-7554-425e-a688-36afda199619'
      }
    ]
  },
  {
    id: 'db17ddb2-a6ba-49f5-9715-e0e81eb7720a',
    from: '1bf9f868-2a59-45ae-8f68-ad68095ca0ac',
    departureDate: '2020-02-02',
    reason: 'Things have changed',
    destinations: [
      {
        id: '13020a26-5840-4758-93bd-9da91920d1e8',
        to: '3dd3b34a-7554-425e-a688-36afda199614', // equal destination branches
        accomodation: '3dd3b34a-7554-425e-a688-36afda199619'
      },
      {
        id: '79d09466-ee4f-4e96-a38b-009e4595121e',
        to: '3dd3b34a-7554-425e-a688-36afda199614',
        accomodation: '3dd3b34a-7554-425e-a688-36afda199619'
      }
    ]
  },
];

export default {
  oneWayTrip, returnTrip, nonExistentTrip, closedTrip, multiTrip
};
