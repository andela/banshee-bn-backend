module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Users', [
    {
      id: 'ffe25dbe-29ea-4759-8461-ed116f6739dd',
      companyId: 'a6e35eb9-8c59-4c7d-b8d4-ae724aa7fb61',
      firstName: 'Femi',
      lastName: 'Tijani',
      email: 'tjhakeemus@gmail.com',
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
  ]),
  down: queryInterface => queryInterface.bulkDelete('Users', null, {})
};
