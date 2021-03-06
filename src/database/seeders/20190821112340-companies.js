/* eslint-disable arrow-parens */
module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Companies', [
    {
      id: 'a6e35eb9-8c59-4c7d-b8d4-ae724aa7fb61',
      name: 'Barclays Premier League',
      address: 'Vicarage Road, Watford',
      code: '4RHJHJJKSK',
      owner: 'Rakuten'
    },
    {
      id: 'a6e35eb9-8c59-4c7d-b8d4-ae724aa7fb62',
      name: 'Spanish Premier League',
      address: 'Villareal Road, spaiard',
      code: 'NOMP0024',
      owner: 'Raul'
    },
    {
      id: 'a6e35eb9-8c59-5c7d-b8d4-ae724aa7fb62',
      name: 'Barefoot Nomad Company',
      address: '12 Ikorodu Road, Lagos',
      code: 'BAREFOOT',
      owner: 'Barefoot Admin'
    }
  ]),
  down: queryInterface => queryInterface.bulkDelete('Companies', null, {})
};
