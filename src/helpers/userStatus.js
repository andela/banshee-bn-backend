const userStatus = (status) => {
  const allStatus = ['active', 'archived', 'unverified', 'suspended'];
  let response;
  if (!allStatus.includes(status)) {
    response = 'Invalid user status';
  }
  switch (status) {
    case 'archived':
      response = 'This account has been temporarily disabled, contact the administrator at your company';
      break;
    case 'unverified':
      response = 'Your account has not been verified';
      break;
    case 'suspended':
      response = 'This account has been suspended for some reasons, contact the administrator at your company';
      break;
    default:
      return true;
  }
  return response;
};

export default userStatus;
