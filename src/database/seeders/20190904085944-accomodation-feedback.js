module.exports = {
  up: queryInterface => queryInterface.bulkInsert('AccomodationFeedbacks', [
    {
      id: '91542e6f-94bc-4e80-a667-586fb0752f25',
      reviews: 'Awesome!!',
      likeDislike: 'like',
      accomodationId: '3dd3b34a-7554-425e-a688-36afda199619',
      tripId: 'ffe25dbe-29ea-4759-8461-ed116f6739df',
      userId: 'ffe25dbe-29ea-4759-8461-ed116f6739dd'
    },
    {
      id: '91542e6f-94bc-4e80-a667-586fb0752f27',
      reviews: 'Great!!',
      likeDislike: 'like',
      accomodationId: '3dd3b34a-7554-425e-c688-36afda199619',
      tripId: 'ffe25dbe-29ea-4759-8462-ed116f6739df',
      userId: '91542e6f-94bc-4e80-a667-586fb0752f23'
    },
    {
      id: '91542e6f-94bc-4e80-a667-586fb0752f28',
      reviews: 'Definitely, home away from home',
      likeDislike: 'like',
      accomodationId: '3dd3b34a-7554-425e-c688-36afda199619',
      tripId: 'ffe25dbe-49ea-4759-8462-ed116f6749df',
      userId: '91542e6f-94bc-4e80-a667-586fb0752f24'
    }
  ]),
  down: queryInterface => queryInterface.bulkInsert('AccomodationFeedbacks', null, {})
};
