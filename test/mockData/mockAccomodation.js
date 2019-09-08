
const accomodationWithWrongBranchId = {
  name: 'The new Accomodation center',
  branchId: '3dd3b34a-1154-455e-a688-36afda199624',
  capacity: '20',
  address: 'This is the address of the center',
  imgurl: 'this is the image url'
};
const accomodationWrongCompany = {
  name: 'The new Accomodation center',
  branchId: '3dd3b34a-7554-425e-a688-36afda199614',
  capacity: '20',
  address: 'This is the address of the center',
  imgurl: 'this is the image url'
};

const existingAccomodation = {
  name: 'Martinez Guest Inn',
  branchId: '3dd3b34a-7554-455e-a688-36afda199624',
  capacity: '20',
  address: 'This is the address of the center',
  imgurl: 'this is the image url'
};
const accomodationComplete = {
  name: 'Martinez Guest Inn Housing',
  branchId: '3dd3b34a-7554-455e-a688-36afda199624',
  capacity: '20',
  address: 'This is the address of the center',
};
const accdtnWithoutName = {
  name: '',
  branchId: '3dd3b34a-7554-455e-a688-36afda199624',
  capacity: '20',
  address: 'This is the address of the center',
};
const InvalidCharacterAcctn = {
  name: 'Proff Guest Inn Tees',
  branchId: '3dd3b34a-7554-455e-a688-36afda199624',
  capacity: '20',
  address: 'This is the address of the center',
};
const addRoom = {
  name: 'Room 4',
  type: 'Executive Room',
  accomodationId: '3dd4b34a-7554-495e-c688-36afda987837'
};
const addRoom1 = {
  name: 'Room 5',
  type: 'Executive Room',
  accomodationId: '3dd4b34a-7554-495e-c688-36afda987837'
};
const roomInAnotherCompany = {
  name: 'Room 5',
  type: 'Executive Room',
  accomodationId: '3dd3b34a-7554-425e-a688-36afda199619'
};
const roomWithWrongAccId = {
  name: 'Room with Sauce',
  type: 'Executive Room',
  accomodationId: 'a72188f2-10bb-4943-932b-f73b93a8f886'
};
const roomWithoutName = {
  name: '',
  type: 'Executive Room',
  accomodationId: '3dd4b34a-7554-495e-c688-36afda987837'
};

const accomodation = {
  accomodationWithWrongBranchId,
  accomodationWrongCompany,
  existingAccomodation,
  accomodationComplete,
  addRoom,
  addRoom1,
  roomWithWrongAccId,
  InvalidCharacterAcctn,
  roomInAnotherCompany,
  roomWithoutName,
  accdtnWithoutName
};

export default accomodation;
