module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Accomodations', [
    {
      id: '3dd3b34a-7554-425e-a688-36afda199619',
      name: 'Johnny Hills Palace',
      branchId: '3dd3b34a-7554-425e-a688-36afda199614',
      capacity: 40,
      status: 'available'
    },
    {
      id: '3dd3b34a-7554-425e-c688-36afda199619',
      name: 'Martinez Guest Inn',
      branchId: '3dd3b34a-7554-455e-a688-36afda199624',
      capacity: 20,
      status: 'filled'
    }
  ]),
  down: queryInterface => queryInterface.bulkDelete('Accomodations', null, {})
};
