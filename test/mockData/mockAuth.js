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
  companyCode: '122dssdd',
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

const user7 = {
  firstName: 'ola1',
  lastName: 'tester',
  email: 'max@gmail.com',
  password: 'testing222',
  gender: 'female',
  dob: '2016-01-01T00:00:00-06:00',
  companyCode: '122dssdd',
  companyId: 'a6e35eb9-8c59-4c7d-b8d4-ae724aa7fb61'
};

const user8 = {
  firstName: 'lanre',
  lastName: 'Daniels',
  email: 'lanre@gmail.com',
  password: 'testing222',
  gender: 'male',
  dob: '2001-04-30',
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

const credentials = {
  email: 'ogedengbe123@gmail.com',
  password: 'malcomX123',
  code: 'NOMP0024'
};

const credentialsWithIncorrectCode = {
  email: 'ogedengbe123@gmail.com',
  password: 'malcomX123',
  code: 'BOM-0025'
};

const credentialsWithIncorrectPassword = {
  email: 'ogedengbe123@gmail.com',
  password: 'malcomX1',
  code: 'NOMP0024'
};

const credentialsWithIncorrectEmail = {
  email: 'ogedengbe12@gmail.com',
  password: 'malcomX123',
  code: 'NOMP0024'
};

const credentialsWithoutEmail = {
  password: 'malcomX123',
  code: 'NOMP0024'
};

const credentialsWithoutCode = {
  email: 'ogedengbe123@gmail.com',
  password: 'malcomX123'
};

const credentialsWithInvalidEmail = {
  email: '',
  password: 'malcomX123',
  code: 'NOM-0024'
};

const completeLoginWithCode = {
  id: '91542e6f-94bc-4e80-a667-586fb0752f23',
  email: 'kukiito219@gmail.com',
  companyId: 'a6e35eb9-8c59-4c7d-b8d4-ae724aa7fb61',
  role: 'staff',
  code: '4RHJHJJKSK'
};
const loginWithUnregisteredEmail = {
  id: '91542e6f-94bc-4e80-a667-586fb0752f23',
  email: 'jjjohnn@gmail.com',
  companyId: 'a6e35eb9-8c59-4c7d-b8d4-ae724aa7fb61',
  role: 'staff',
  code: '4RHJHJJKSK'
};
const completeLoginWithoutCode = {
  id: '91542e6f-94bc-4e80-a667-586fb0752f23',
  email: 'kukiito219@gmail.com',
  companyId: 'a6e35eb9-8c59-4c7d-b8d4-ae724aa7fb61',
  role: 'staff',
  code: ''
};

const credentialsWithInvalidEmail2 = {
  email: 'ogedengbe123gmail.com',
  password: 'malcomX123',
  code: 'NOM-0024'
};

const user9 = {
  firstName: 'femi',
  lastName: 'Tijani',
  email: 'femitj@gmail.com',
  password: 'testing222',
  gender: 'male',
  dob: '2001-04-30',
  companyName: 'olutiMedia',
  address: '4th, saint john str',
  code: 'OTM123'
};

const userNineLoginDetails = {
  email: 'femitj@gmail.com',
  password: 'testing222',
  code: 'OTM123'
};
const superAdminLogin = {
  id: '91542e6f-94bc-4e80-a667-586fb3752f25',
  email: 'banshee.barefoot@gmail.com',
  companyId: 'a6e35eb9-8c59-5c7d-b8d4-ae724aa7fb62',
  role: 'super admin',
};
const unverifiedUser = {
  id: '91542e6f-94bc-4e80-a667-586fb3752f25',
  companyId: 'a6e35eb9-8c59-4c7d-b8d4-ae724aa7fb61',
  email: 'john.doe@gmail.com',
  role: 'staff'
};
const credentialsWithoutRole = {
  id: '91542e6f-94bc-4e80-a667-586fb3752f25',
  companyId: 'a6e35eb9-8c59-4c7d-b8d4-ae724aa7fb61',
  email: 'john.doe@gmail.com',
  role: ''
};
const incorrectCompanyId = {
  id: '91542e6f-94bc-4e80-a667-586fb0752f23',
  email: 'kukiito219@gmail.com',
  companyId: 'a6e35eb9-8c510-4c7d-b8d4-ae724aa7fb61',
  role: 'staff',
};

const user10 = {
  email: 'kukiito219@gmail.com',
  password: '12345678',
  code: '4RHJHJJKSK'
};

const credentialsForServerError = {
  firstName: 'lanre',
  lastName: 'Daniels',
  email: 'alamu@gmail.com',
  password: 'testing222',
  gender: 'male',
  dob: '2001-04-30',
  companyName: 'Samket',
  address: '4th, saint john str',
  code: 'SAM123'
};

const credentialsForServerError2 = {
  firstName: 'lanre',
  lastName: 'Daniels',
  email: 'alamu@gmail.com',
  password: 'testing222',
  gender: 'male',
  dob: '2001-04-30',
  companyCode: '4RHJHJJKSK'
};

const users = {
  user1,
  user2,
  user3,
  user4,
  user5,
  user6,
  user7,
  user8,
  user9,
  user10,
  credentials,
  credentialsWithInvalidEmail,
  credentialsWithInvalidEmail2,
  credentialsWithIncorrectCode,
  credentialsWithoutCode,
  credentialsWithoutEmail,
  credentialsWithIncorrectEmail,
  credentialsWithIncorrectPassword,
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
  completeLoginWithCode,
  completeLoginWithoutCode,
  loginWithUnregisteredEmail,
  userNineLoginDetails,
  superAdminLogin,
  unverifiedUser,
  credentialsWithoutRole,
  incorrectCompanyId,
  credentialsForServerError,
  credentialsForServerError2
};

export default users;
