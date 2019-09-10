const oneWayTravelRequests = [
  {
    type: 'oneway',
    from: '3dd3b34a-7554-425e-a688-36afda199614',
    departureDate: '2020-09-09',
    reason: 'Just wanna travel',
    destinations: [
      {
        to: '3dd3b34a-7554-455e-a688-36afda199624',
        accomodation: '3dd3b34a-7554-425e-a688-36afda199619'
      }
    ]
  },
  {
    type: 'invalid',
    from: '3dd3b34a-7554-425e-a688-36afda1996ab',
    departureDate: '2000-09-09',
    reason: 'Just wanna travel',
    destinations: [
      {
        to: '3dd3b34a-7554-455e-a688-36afda199624',
        accomodation: '3dd3b34a-7554-425e-a688-36afda199619'
      }
    ]
  },
  {
    type: 'oneway',
    from: '3dd3b34a-7554-425e-a688-36afda1996ab',
    departureDate: '2000-09-09',
    reason: 'Just wanna travel',
    destinations: [
      {
        to: '3dd3b34a-7554-455e-a688-36afda199624',
        accomodation: '3dd3b34a-7554-425e-a688-36afda199619'
      }
    ]
  },
  {
    type: 'oneway',
    from: '3dd3b34a-7554-425e-a688-36afda199614',
    departureDate: '2000-09-09',
    reason: 'Just wanna travel',
    destinations: [
      {
        to: '3dd3b34a-7554-455e-a688-36afda199100',
        accomodation: '3dd3b34a-7554-425e-a688-36afda199619'
      }
    ]
  },
  {
    type: 'oneway',
    from: '3dd3b34a-7554-425e-a688-36afda199614',
    departureDate: '2000-09-09',
    reason: 'Just wanna travel',
    destinations: [
      {
        to: '3dd3b34a-7554-425e-a688-36afda199614',
        accomodation: '3dd3b34a-7554-425e-a688-36afda199619'
      }
    ]
  },
  {
    type: 'oneway',
    from: '3dd3b34a-7554-425e-a688-36afda199614',
    departureDate: '2000-09-09',
    reason: 'Just wanna travel',
    destinations: [
      {
        to: '3dd3b34a-7554-455e-a688-36afda199624',
        accomodation: '3dd3b34a-7554-425e-a688-36afda199100'
      }
    ]
  },
  {
    type: '  ',
    from: '3dd3b34a-7554-425e-a688-36afda199614',
    departureDate: '2000-09-09',
    reason: 'Just wanna travel',
    destinations: [
      {
        to: '3dd3b34a-7554-455e-a688-36afda199624',
        accomodation: '3dd3b34a-7554-425e-a688-36afda199100'
      }
    ]
  },
  {
    type: 'oneway',
    from: '',
    departureDate: '2000-09-09',
    reason: 'Just wanna travel',
    destinations: [
      {
        to: '3dd3b34a-7554-455e-a688-36afda199624',
        accomodation: '3dd3b34a-7554-425e-a688-36afda199100'
      }
    ]
  },
  {
    type: 'oneway',
    from: '3dd3b34a-7554-425e-a688-36afda199614',
    departureDate: '',
    reason: 'Just wanna travel',
    destinations: [
      {
        to: '3dd3b34a-7554-455e-a688-36afda199624',
        accomodation: '3dd3b34a-7554-425e-a688-36afda199100'
      }
    ]
  },
  {
    type: 'oneway',
    from: '3dd3b34a-7554-425e-a688-36afda199614',
    departureDate: '2000-09-40',
    reason: 'Just wanna travel',
    destinations: [
      {
        to: '3dd3b34a-7554-455e-a688-36afda199624',
        accomodation: '3dd3b34a-7554-425e-a688-36afda199100'
      }
    ]
  },
  {
    type: 'oneway',
    from: '3dd3b34a-7554-425e-a688-36afda199614',
    departureDate: '2000-09-09',
    reason: '',
    destinations: [
      {
        to: '3dd3b34a-7554-455e-a688-36afda199624',
        accomodation: '3dd3b34a-7554-425e-a688-36afda199100'
      }
    ]
  },
];

const returnTravelRequests = [
  {
    type: 'return',
    from: '3dd3b34a-7554-425e-a688-36afda199614',
    departureDate: '2020-09-09',
    returnDate: '2020-09-10',
    reason: 'Just wanna travel',
    destinations: [
      {
        to: '3dd3b34a-7554-455e-a688-36afda199624',
        accomodation: '3dd3b34a-7554-425e-a688-36afda199619'
      }
    ]
  },
  {
    type: 'return',
    from: '3dd3b34a-7554-425e-a688-36afda199614',
    departureDate: '2020-09-09',
    returnDate: 'invalid',
    reason: 'Just wanna travel',
    destinations: [
      {
        to: '3dd3b34a-7554-455e-a688-36afda199624',
        accomodation: '3dd3b34a-7554-425e-a688-36afda199619'
      }
    ]
  },
  {
    type: 'return',
    from: '3dd3b34a-7554-425e-a688-36afda199614',
    departureDate: '2020-09-09',
    returnDate: '2020-09-09',
    reason: 'Just wanna travel',
    destinations: [
      {
        to: '3dd3b34a-7554-455e-a688-36afda199624',
        accomodation: '3dd3b34a-7554-425e-a688-36afda199619'
      }
    ]
  },
];

const multiTripRequests = [
  {
    type: 'oneway',
    from: '3dd3b34a-7554-425e-a688-36afda199614',
    departureDate: '2020-02-19',
    reason: 'Robert Mugabe is no more',
    destinations: [
      {
        to: '3dd3b34a-7554-455e-a688-36afda199624',
        accomodation: '3dd3b34a-7554-425e-a688-36afda199619'
      },
      {
        to: '3dd3b34a-7553-455e-a688-36afda199614',
        accomodation: '3dd3b34a-7554-425e-a688-36afda199619'
      }
    ]
  },
  {
    type: 'oneway',
    from: '3dd3b34a-7554-425e-a688-36afda199614',
    departureDate: '2000-02-19',
    reason: 'Robert Mugabe is no more',
    destinations: [
      {
        to: '3dd3b34a-7553-455e-a688-36afda199614',
        accomodation: '3dd3b34a-7554-425e-a688-36afda199619'
      },
      {
        to: '3dd3b34a-7553-455e-a688-36afda199614',
        accomodation: '3dd3b34a-7554-425e-a688-36afda199619'
      }
    ]
  }
];

export default { oneWayTravelRequests, returnTravelRequests, multiTripRequests };
