module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Users', [
    {
      first_name: 'Femi',
      last_name: 'Tijani',
      email: 'tjhakeemus@gmail.com',
      password: '12345678',
      role: 'Software Engineer',
      gender: 'male'
    },
    {
      first_name: 'Desmond',
      last_name: 'Edem',
      email: 'kukiito@gmail.com',
      password: '12345678',
      role: 'Software Engineer',
      gender: 'male'
    },
    {
      first_name: 'Maxwell',
      last_name: 'Eke',
      email: 'muximusekeh@gmail.com',
      password: '12345678',
      role: 'Software Engineer',
      gender: 'male'
    },
    {
      first_name: 'Muheed',
      last_name: 'Olakunle',
      email: 'olakunlemuheeb@gmail.com',
      password: '12345678',
      role: 'Software Engineer',
      gender: 'male'
    },
    {
      first_name: 'Peter',
      last_name: 'Tyonum',
      email: 'kukiito@gmail.com',
      password: '12345678',
      role: 'Software Engineer',
      gender: 'male'
    },
    {
      first_name: 'Babatunde',
      last_name: 'Ogedengbe',
      email: 'kukiito@gmail.com',
      password: '12345678',
      role: 'Software Engineer',
      gender: 'male'
    }
  ])
};
