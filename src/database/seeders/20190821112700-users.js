import hashHelper from '../../helpers/Hash';

module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Users', [
    {
      id: 'ffe25dbe-29ea-4759-8461-ed116f6739dd',
      companyId: 'a6e35eb9-8c59-4c7d-b8d4-ae724aa7fb61',
      firstName: 'Femi',
      lastName: 'Tijani',
      email: 'tjhakeemus1@gmail.com',
      password: '12345678',
      dob: '2012-09-12',
      gender: 'male',
      status: 'active',
      role: 'staff'
    },
    {
      id: '91542e6f-94bc-4e80-a667-586fb0752f23',
      companyId: 'a6e35eb9-8c59-4c7d-b8d4-ae724aa7fb61',
      firstName: 'Desmond',
      lastName: 'Edem',
      email: 'kukiito219@gmail.com',
      password: '12345678',
      gender: 'male',
      dob: '2012-09-12',
      status: 'active',
      role: 'staff'
    },
    {
      id: '91542e6f-94bc-4e80-a667-586fb0752f24',
      companyId: 'a6e35eb9-8c59-4c7d-b8d4-ae724aa7fb62',
      firstName: 'Babatunde',
      lastName: 'Ogedengbe',
      email: 'ogedengbe123@gmail.com',
      password: hashHelper.hashPassword('malcomX123'),
      gender: 'male',
      dob: '2012-09-12',
      status: 'active',
      role: 'staff'
    },
    {
      id: 'd7c0b7a9-e2cc-4b2c-9c15-dfd4920c60ff',
      firstName: 'ola1',
      lastName: 'tester',
      email: 'max@gmail.com',
      password: hashHelper.hashPassword('testing222'),
      gender: 'female',
      dob: '2012-09-12',
      companyId: 'a6e35eb9-8c59-4c7d-b8d4-ae724aa7fb61',
      role: 'staff',
      status: 'active'
    },
    {
      id: '91542e6f-94bc-4e80-a667-586fb0752f25',
      companyId: 'a6e35eb9-8c59-4c7d-b8d4-ae724aa7fb62',
      firstName: 'Peter',
      lastName: 'Tyonum',
      email: 'withtvpeter@gmail.com',
      password: hashHelper.hashPassword('password2019'),
      gender: 'male',
      dob: '2012-09-10',
      status: 'active',
      role: 'staff'
    },
  ]),
  down: queryInterface => queryInterface.bulkDelete('Users', null, {})
};
