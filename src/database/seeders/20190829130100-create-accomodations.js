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
    },
    {
      id: '3dd3b34a-7554-425e-a688-36afda199615',
      name: 'Ocean drive Inn',
      branchId: '3dd3b34a-7554-425e-a688-36afda199614',
      capacity: 10,
      status: 'filled',
      imgurl: null,
      address: '31, Ocean drive, Lekki'
    },
    {
      id: 'b4e9ba65-cb81-4b8a-8aec-1ffe24a9ed33',
      name: 'Oriental',
      branchId: '7b717bff-9202-4c44-9848-80ec876b6fdc',
      capacity: 100,
      status: 'filled'
    },
    {
      id: 'b1a81334-fbf4-4160-83bf-e58f9063f7cf',
      name: 'Crown Berry',
      branchId: '1404d644-fa2e-49a9-982f-eec3afeb5c0d',
      capacity: 100,
      status: 'filled'
    },
    {
      id: 'a16d39cd-3499-493a-8dd9-6141ed33df73',
      name: 'Eko Hotel',
      branchId: 'dbbe4992-4091-4914-a266-38ecdcf42083',
      capacity: 100,
      status: 'filled'
    },
  ]),
  down: queryInterface => queryInterface.bulkDelete('Accomodations', null, {})
};
