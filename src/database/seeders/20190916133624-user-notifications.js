

module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Notifications', [
    {
      id: '5df321d8-76f3-4d49-a025-071f9f45bca8',
      tripId: 'c4a3f571-18da-4bd1-92e7-5c2906b86479',
      recipients: '{banshee.admin@gmail.com,ogedengbe123@gmail.com}',
      message: 'Babatunde Ogedengbe requested for a oneway trip',
      createdAt: '2019-09-16 10:29:44.788+00',
      updatedAt: '2019-09-16 10:29:44.788+00',
    },
    {
      id: 'd1bd93e9-2892-4940-82f2-00c29ba20bec',
      tripId: '8e101d1f-80e0-469b-abd7-2d9812d3d14b',
      recipients: '{banshee.admin@gmail.com,ogedengbe123@gmail.com}',
      message: 'Babatunde Ogedengbe requested for a return trip',
      createdAt: '2019-09-16 10:29:44.788+00',
      updatedAt: '2019-09-16 10:29:44.788+00',
    },
    {
      id: '71542506-78bf-4e72-940a-85caca7af31a',
      tripId: 'cd5dd483-46e1-426c-a5f2-45e586ee3bc1',
      recipients: '{banshee.admin@gmail.com,ogedengbe123@gmail.com}',
      message: 'Babatunde Ogedengbe requested for a oneway trip',
      createdAt: '2019-09-16 10:29:44.788+00',
      updatedAt: '2019-09-16 10:29:44.788+00',
    }
  ]),

  down: queryInterface => queryInterface.bulkDelete('Notificaitons', null, {})
};
