module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Ratings', [
    {
      userId: '91542e6f-94bc-4e80-a667-586fb0752f23',
      accomodationId: '3dd3b34a-7554-425e-a688-36afda199619',
      ratingValue: 3
    }
  ]),
  down: queryInterface => queryInterface.bulkDelete('Ratings', null, {})
};
