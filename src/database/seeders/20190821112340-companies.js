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
    },
    {
      id: 'e819fb11-d55f-4cbf-ad04-894d53cee722',
      name: 'Soft Blues Limited',
      address: '234 Muriokunola street, Lagos Island',
      code: 'SB0002',
      owner: 'Brightside'
    }
  ]),
  down: queryInterface => queryInterface.bulkDelete('Companies', null, {})
};
