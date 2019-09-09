import db from '../database/models';

const { User } = db;
/**
   *
   * @description - this function updates a user email option
   * @param {object} option
   * @param {string} email
   * @returns {object} object
   */
const modifyUserNotificationOpt = async (option, email) => {
  const updatedUser = await User.update({ ...option },
    {
      where: { email },
      returning: true,
      plain: true,
    });
  return updatedUser;
};

export default modifyUserNotificationOpt;
