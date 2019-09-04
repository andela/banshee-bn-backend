module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Branches', [
    {
      id: '3dd3b34a-7554-425e-a688-36afda199614',
      name: 'Ikeja',
      locationId: '3dd3b24a-7554-425e-a688-36afda195614'
    },
    {
      id: '3dd3b34a-7554-455e-a688-36afda199624',
      name: 'Gwagwalada',
      locationId: '0190ae78-d184-4258-add5-0b2c6982efef'
    },
    {
      id: '3dd3b34a-7553-455e-a688-36afda199624',
      name: 'Rumola',
      locationId: '0190ae78-d184-4258-add5-0b2c6982efef'
    },
    {
      id: '3dd3b34a-7553-455e-a688-36afda199614',
      name: 'Calabar South',
      locationId: '0190ae78-d184-4258-add5-0b2c6982efef'
    }
  ]),
  down: queryInterface => queryInterface.bulkDelete('Branches', null, {})
};
