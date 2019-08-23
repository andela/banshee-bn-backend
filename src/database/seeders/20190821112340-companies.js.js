module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Companies', [
    {
      id: 'a6e35eb9-8c59-4c7d-b8d4-ae724aa7fb61',
      name: 'Barclays Premier League',
      address: 'Vicarage Road, Watford',
      code: '4RHJHJJKSK',
      owner: 'Rakuten'
    },
  ]),
  down: queryInterface => queryInterface.bulkDelete('Companies', null, {})
};
