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
    },
   {
      id: '1404d644-fa2e-49a9-982f-eec3afeb5c0d',
      name: 'Rumuokoro',
      locationId: 'a8ac5089-a87f-4c06-9556-c611835ab5ba'
    },
    {
      id: '7b717bff-9202-4c44-9848-80ec876b6fdc',
      name: 'Ikeja',
      locationId: '33891516-0002-472d-9b2e-d9eca01f1db2'
    },
    {
      id: 'dbbe4992-4091-4914-a266-38ecdcf42083',
      name: 'Gwagwalada',
      locationId: 'd6935e25-a979-4e0c-88f1-255bb44e22b9'
    },
  ]),
  down: (queryInterface) => queryInterface.bulkDelete('Branches', null, {})
};
