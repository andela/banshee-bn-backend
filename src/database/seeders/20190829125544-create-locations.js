
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
      companyId: 'a6e35eb9-8c59-4c7d-b8d4-ae724aa7fb62',
      country: 'Nigeria',
      city: 'Lagos'
    }
  ]),
  down: queryInterface => queryInterface.bulkDelete('Locations', null, {})
};
