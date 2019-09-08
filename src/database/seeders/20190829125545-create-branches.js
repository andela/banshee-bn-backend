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
    },
    {
      id: '1bf9f868-2a59-45ae-8f68-ad68095ca0ac',
      name: 'Asokoro',
      locationId: '0190ae78-d184-4258-add5-0b2c6982efef'
    },
    {
      id: '3dd3b34a-7554-455e-a688-36afda199159',
      name: 'Ibadan',
      locationId: '0190ae78-d184-4258-add5-0b2c6982efef'
    }
  ]),
  down: (queryInterface) => queryInterface.bulkDelete('Branches', null, {})
};
