const user6 = {
  firstName: 'Sonny',
  lastName: 'Banshee',
  email: 'banshee@gmail.com',
  password: '12345678',
  dob: '2001-04-30',
  gender: 'female',
  companyCode: '4RHJHJJKSK'
};

const user1 = {
  firstName: 'test',
  lastName: 'Tester',
  email: 'mrtest@gmail.com',
  password: 'testing1',
  gender: 'male',
  dob: '2001-04-30',
  companyCode: '4RHJHJJKSK'
};

const user2 = {
  firstName: 'Mrstest',
  lastName: 'tester',
  email: 'test@test.com',
  password: 'testing2',
  gender: 'female',
  dob: '2001-04-30',
  companyCode: '4RHJHJJKSK'
};

const user3 = {
  first: 'olademi',
  lastName: 'tester',
  email: 'tj@gmail.com',
  password: 'testing222',
  gender: 'female',
  dob: '2001-04-30',
  companyCode: '4RHJHJJKSK'
};

const user4 = {
  firstName: 'olademi',
  lastName: 'tester',
  email: 'olatj@gmail.com',
  password: 'testing222',
  gender: 'female',
  dob: '2001-04-30',
  companyCode: '122dssdd'
};

const user5 = {
  firstName: 'olademi',
  lastName: 'tester',
  email: 'olatj@gmail.com',
  password: 'testing222',
  gender: 'female',
  dob: '2001-04-30',
  companyCode: '122dssdd',
  companyName: 'PWC',
  address: '4th, saint john str',
  code: 'PWC123'
};

const undefinedLastname = {
  firstName: 'Sonny',
  lastName: '',
  email: 'banshee@gmail.com',
  password: '12345678',
  dob: '2001-04-30',
  gender: 'female',
  companyCode: '4RHJHJJKSK'
};

const invalidLastname = {
  firstName: 'Sonny',
  lastName: '2xcerpt',
  email: 'banshee@gmail.com',
  password: '12345678',
  dob: '2001-04-30',
  gender: 'female',
  companyCode: '4RHJHJJKSK'
};

const undefinedFirstname = {
  firstName: '',
  lastName: 'Banshee',
  email: 'banshee@gmail.com',
  password: '12345678',
  dob: '2001-04-30',
  gender: 'female',
  companyCode: '4RHJHJJKSK'
};

const invalidFirstname = {
  firstName: '2xcerpt',
  lastName: 'Banshee',
  email: 'banshee@gmail.com',
  password: '12345678',
  dob: '2001-04-30',
  gender: 'female',
  companyCode: '4RHJHJJKSK'
};

const undefinedEmail = {
  firstName: 'Sonny',
  lastName: 'Banshee',
  email: '',
  password: '12345678',
  gender: 'male',
  dob: '2001-04-30',
  companyCode: '4RHJHJJKSK'
};

const invalidEmail = {
  firstName: 'Sonny',
  lastName: 'Banshee',
  email: 'gmail.com',
  password: '12345678',
  gender: 'male',
  dob: '2001-04-30',
  companyCode: '4RHJHJJKSK'
};

const invalidPassword = {
  firstName: 'Sonny',
  lastName: 'Banshee',
  email: 'banshee@gmail.com',
  password: '12',
  gender: 'male',
  dob: '2001-04-30',
  companyCode: '4RHJHJJKSK'
};

const undefinedPassword = {
  firstName: 'Sonny',
  lastName: 'Banshee',
  email: 'banshee@gmail.com',
  password: '',
  gender: 'male',
  dob: '2001-04-30',
  companyCode: '4RHJHJJKSK'
};

const undefinedDOB = {
  firstName: 'Sonny',
  lastName: 'Banshee',
  email: 'banshee@gmail.com',
  password: '12345678',
  gender: 'male',
  dob: '',
  companyCode: '4RHJHJJKSK'
};

const invalidDOB = {
  firstName: 'Sonny',
  lastName: 'Banshee',
  email: 'banshee@gmail.com',
  password: '12345678',
  gender: 'male',
  dob: '2020-09-31',
  companyCode: '4RHJHJJKSK'
};

const undefinedGender = {
  firstName: 'Sonny',
  lastName: 'Banshee',
  email: 'banshee@gmail.com',
  password: '12345678',
  gender: '',
  dob: '2001-09-31',
  companyCode: '4RHJHJJKSK'
};

const invalidGender = {
  firstName: 'Sonny',
  lastName: 'Banshee',
  email: 'banshee@gmail.com',
  password: '12345678',
  gender: 'transexual',
  dob: '2001-09-31',
  companyCode: '4RHJHJJKSK'
};

const invalidCode = {
  firstName: 'Sonny',
  lastName: 'Banshee',
  email: 'banshee23@gmail.com',
  password: '12345678',
  gender: 'male',
  dob: '2001-09-31',
  companyCode: '122dssdd'
};

const users = {
  user6,
  user1,
  user2,
  user3,
  user4,
  invalidLastname,
  undefinedLastname,
  undefinedFirstname,
  invalidFirstname,
  undefinedEmail,
  invalidEmail,
  invalidPassword,
  undefinedPassword,
  undefinedDOB,
  invalidDOB,
  undefinedGender,
  invalidGender,
  invalidCode,
  user5
};

export default users;
