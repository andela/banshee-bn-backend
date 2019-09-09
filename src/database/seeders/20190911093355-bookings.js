module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Bookings', [
    {
      accomodationId: '3dd3b34a-7554-425e-a688-36afda199619',
      roomId: '3dd3b34a-1254-495e-a688-36afda199619',
      bookDate: '2019-09-15',
      occupiedBy: '91542e6f-94bc-4e80-a667-586fb0752f23'
    }
  ]),
  down: queryInterface => queryInterface.bulkDelete('Bookings', null, {})
};
