module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Rooms', [
    {
      id: '3dd3b34a-1254-495e-a688-36afda199619',
      name: 'Room 1',
      type: 'Executive Room',
      accomodationId: '3dd3b34a-7554-425e-a688-36afda199619',
    },
    {
      id: '3dd3b34a-1254-495e-a688-36afda133619',
      name: 'Room 2',
      type: 'Single Room',
      accomodationId: '3dd3b34a-7554-425e-c688-36afda199619',
    },
    {
      id: '6dd3b34a-1254-495e-a628-36afda133919',
      name: 'Room 3',
      type: 'King Room',
      accomodationId: '3dd3b34a-7554-425e-c688-36afda199619',
    },
    {
      id: '3dd3b34a-4454-495e-a688-36afda903619',
      name: 'Room 4',
      type: 'Single Room',
      accomodationId: '3dd3b34a-7554-425e-a688-36afda199619',
    },
    {
      id: '3dd3b34a-1254-495e-a688-36afda199616',
      name: 'Room 5',
      type: 'Single Room',
      accomodationId: '3dd3b34a-7554-425e-a688-36afda199619',
      booked: 'true'
    },
    {
      id: '3dd3b34a-1254-495e-a688-36afda199613',
      name: 'Room 6',
      type: 'Standard Room',
      accomodationId: '3dd3b34a-7554-425e-a688-36afda199619',
    }
  ]),
  down: queryInterface => queryInterface.bulkDelete('Rooms', null, {})
};
