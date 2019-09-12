import hashHelper from '../../helpers/Hash';

module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Users', [
    {
      id: 'ffe25dbe-29ea-4759-8461-ed116f6739dd',
      companyId: 'a6e35eb9-8c59-4c7d-b8d4-ae724aa7fb61',
      firstName: 'Femi',
      lastName: 'Tijani',
      email: 'tjhakeemus1@gmail.com',
      password: hashHelper.hashPassword('12345678'),
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
      password: hashHelper.hashPassword('12345678'),
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
      role: 'travel admin'
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
    {
      id: '91542e6f-94bc-4e80-a667-586fb3752f25',
      companyId: 'a6e35eb9-8c59-5c7d-b8d4-ae724aa7fb62',
      firstName: 'Barefoot',
      lastName: 'Nomad',
      email: 'banshee.barefoot@gmail.com',
      password: hashHelper.hashPassword('password2019'),
      gender: 'male',
      dob: '2012-09-10',
      status: 'active',
      role: 'super admin'
    },
    {
      id: '91542e6f-94bc-4e80-a667-586fb3752f26',
      companyId: 'a6e35eb9-8c59-5c7d-b8d4-ae724aa7fb62',
      firstName: 'Emperor',
      lastName: 'Ghadaffi',
      email: 'ghaddafi@gmail.com',
      password: hashHelper.hashPassword('password2019'),
      gender: 'male',
      dob: '2012-09-10',
      status: 'active',
      role: 'manager'
    },
    {
      id: '91542e6f-94bc-4e80-a667-586fb3752f65',
      companyId: 'a6e35eb9-8c59-4c7d-b8d4-ae724aa7fb61',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@gmail.com',
      password: hashHelper.hashPassword('password2019'),
      gender: 'male',
      dob: '2012-09-10',
      status: 'unverified',
      role: 'staff'
    },
    {
      id: 'ffe25dbe-29ea-4759-8464-ed116f6739dd',
      companyId: 'a6e35eb9-8c59-4c7d-b8d4-ae724aa7fb61',
      firstName: 'Robert',
      lastName: 'Mugabe',
      email: 'thaRealMugabe@gmail.com',
      password: hashHelper.hashPassword('password2019'),
      gender: 'male',
      dob: '2012-09-12',
      status: 'active',
      role: 'manager'
    },
    {
      id: '91542e6f-94bc-4e80-a667-586fb3752f69',
      companyId: 'a6e35eb9-8c59-4c7d-b8d4-ae724aa7fb61',
      firstName: 'Travel',
      lastName: 'Admin',
      email: 'travel.admin@gmail.com',
      password: hashHelper.hashPassword('password2019'),
      gender: 'male',
      dob: '2012-09-10',
      status: 'active',
      role: 'travel admin'
    },
    {
      id: '91542e6f-94bc-4e81-a667-586fb0752f25',
      companyId: 'a6e35eb9-8c59-4c7d-b8d4-ae724aa7fb62',
      firstName: 'Banshee',
      lastName: 'Travel',
      email: 'banshee.admin@gmail.com',
      password: hashHelper.hashPassword('password2019'),
      gender: 'male',
      dob: '2012-09-10',
      status: 'active',
      role: 'travel admin'
    },
    {
      id: 'd885cb0d-8520-4ee1-bab7-d3097adadc32',
      companyId: 'a6e35eb9-8c59-4c7d-b8d4-ae724aa7fb61',
      firstName: 'Managing',
      lastName: 'Director',
      email: 'managing.director@gmail.com',
      password: hashHelper.hashPassword('password2019'),
      gender: 'male',
      dob: '2012-09-10',
      status: 'active',
      role: 'manager'
    },
  ]),
  down: queryInterface => queryInterface.bulkDelete('Users', null, {})
};