const user = {
  firstName: 'Sonny',
  lastName: 'Banshee',
  email: 'banshee@gmail.com',
  password: '12345678',
  dob: '2001-04-30',
  gender: 'female',
  companyCode: '4RHJHJJKSK'
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
  user,
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
  invalidCode
};

export default users;
