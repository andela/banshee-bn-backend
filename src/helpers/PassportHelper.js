/**
 * @exports PassportHelper
 * @class PassportHelper
 * @description Handles Passport user data
 * */
class PassportHelper {
  /**
   * Return object with users data from social
   * @async
   * @param  {string} accessToken - Access token from social
   * @param  {string} refreshToken - Refresh token from social
   * @param  {object} profile - user profile
   * @param {function} done - Return data
   * @return {object} return user data
   * @static
   */
  static async verifyCallback(accessToken, refreshToken, profile, done) {
    try {
      const user = profile.emails[0].value ? profile.emails[0].value : profile.displayName;
      done(null, user);
    } catch (error) {
      done(error, false, error.message);
    }
  }
}
export default PassportHelper;
