import bcrypt from 'bcryptjs';

/** Hash Class */
class Hash {
/**
   * @description - hash password method
   * @param {string} password
   * @return {string} hased password
   */
  static hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  }

  /**
   * @description - this method compares password
   * @param {string} hashPassword
   * @param {string} password
   * @return {string} hased password
   */
  static comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  }
}

export default Hash;
