module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Accomodations', [
    {
      id: '3dd3b34a-7554-425e-a688-36afda199619',
      name: 'Johnny Hills Palace',
      branchId: '3dd3b34a-7554-425e-a688-36afda199614',
      capacity: 40,
      status: 'available',
      imgurl: 'https://res.cloudinary.com/tvpeter/image/upload/v1567651493/hotel2_p5ator.jpg',
      address: '12 Allen Avenue, Ikeja'
    },
    {
      id: '3dd3b34a-7554-425e-c688-36afda199619',
      name: 'Martinez Guest Inn',
      branchId: '3dd3b34a-7554-455e-a688-36afda199624',
      capacity: 20,
      status: 'filled',
      imgurl: 'https://res.cloudinary.com/tvpeter/image/upload/v1567651493/hotel_onnio1.jpg',
      address: '20 Kenny Johns Drive, Gwagwalada'
    },
    {
      id: '3dd4b34a-7554-495e-c688-36afda987837',
      name: 'Rocktop Guest House',
      branchId: '3dd3b34a-7554-455e-a688-36afda199159',
      capacity: 12,
      status: 'available',
      imgurl: 'https://res.cloudinary.com/tvpeter/image/upload/v1567651493/hotel_onnio1.jpg',
      address: '20 Kenny Johns Drive, Abuja'
    }
  ]),
  down: queryInterface => queryInterface.bulkDelete('Accomodations', null, {})
};
