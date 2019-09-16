
module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Locations', [
    {
      id: '0190ae78-d184-4258-add5-0b2c6982efef',
      companyId: 'a6e35eb9-8c59-4c7d-b8d4-ae724aa7fb61',
      country: 'Nigeria',
      city: 'Abuja'
    },
    {
      id: '3dd3b24a-7554-425e-a688-36afda195614',
      companyId: 'a6e35eb9-8c59-4c7d-b8d4-ae724aa7fb61',
      country: 'Nigeria',
      city: 'Lagos'
    },
    {
      id: 'bf308b41-56fe-47fb-ba50-36fb998a4d21',
      companyId: 'a6e35eb9-8c59-4c7d-b8d4-ae724aa7fb61',
      country: 'Nigeria',
      city: 'Portharcourt'
    },
    {
      id: '07eea927-ae7e-4f3d-a9f8-31651c0e66c6',
      companyId: 'a6e35eb9-8c59-4c7d-b8d4-ae724aa7fb62',
      country: 'Nigeria',
      city: 'Abuja'
    },
    {
      id: '48d67cc4-8056-4585-802b-905d940e27eb',
      companyId: 'a6e35eb9-8c59-4c7d-b8d4-ae724aa7fb62',
      country: 'Nigeria',
      city: 'Lagos'
    },
    {
      id: 'bc6afe1c-70a2-4418-a88b-2a5e79eea008',
      companyId: 'a6e35eb9-8c59-4c7d-b8d4-ae724aa7fb62',
      country: 'Nigeria',
      city: 'Portharcourt'
    },
    {
      id: 'd6935e25-a979-4e0c-88f1-255bb44e22b9',
      companyId: 'e819fb11-d55f-4cbf-ad04-894d53cee722',
      country: 'Nigeria',
      city: 'Abuja'
    },
    {
      id: '33891516-0002-472d-9b2e-d9eca01f1db2',
      companyId: 'e819fb11-d55f-4cbf-ad04-894d53cee722',
      country: 'Nigeria',
      city: 'Lagos'
    },
    {
      id: 'a8ac5089-a87f-4c06-9556-c611835ab5ba',
      companyId: 'e819fb11-d55f-4cbf-ad04-894d53cee722',
      country: 'Nigeria',
      city: 'Portharcourt'
    },
  ]),
  down: queryInterface => queryInterface.bulkDelete('Locations', null, {})
};
