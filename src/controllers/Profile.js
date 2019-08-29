import db from '../database/models';
import Response from '../helpers/Response';

const { User, Company } = db;

/** user profile class */
class Profile {
  /**
   *
   * @param {req} req
   * @param {res} res
   * @returns {object} object
   */
  static async getProfile(req, res) {
    try {
      const { payload } = req.payload;
      const { email } = payload;

      const user = await User.findOne({ where: { email } });
      const {
        firstName, lastName, gender, dob, companyId
      } = user;

      const company = await Company.findOne({ where: { id: companyId } });
      const {
        name, address
      } = company;

      const response = new Response(
        true,
        200,
        'User Profile retrieved successfuly',
        {
          profile: {
            firstName,
            lastName,
            gender,
            dob,
            companyName: name,
            address
          }
        }
      );
      return res.status(response.code).json(response);
    } catch (err) {
      const response = new Response(
        false,
        500,
        'Server error, Please try again later',
      );
      return res.status(response.code).json(response);
    }
  }

  /**
   *
   * @param {req} req
   * @param {res} res
   * @returns {object} object
   */
  static async updateProfile(req, res) {
    try {
      const { payload } = req.payload;
      const { email, role, id } = payload;
      const {
        firstName, lastName, gender, dob, companyName, address
      } = req.body;

      await User.update(
        {
          firstName, lastName, gender, dob
        },
        {
          where: { email },
          returning: true,
        }
      );

      if (role === 'travel admin' || role === 'staff') {
        const response = new Response(
          true,
          200,
          'User Profile updated successfuly',
          {
            profile: {
              firstName, lastName, gender, dob
            }
          }
        );
        return res.status(response.code).json(response);
      }

      if (role === 'manager') {
        await Company.update(
          { name: companyName, address },
          {
            where: { owner: id },
            returning: true,
          }
        );

        const response = new Response(
          true,
          200,
          'Admin Profile updated successfuly',
          {
            profile: {
              firstName, lastName, gender, dob, companyName, address
            }
          }
        );
        return res.status(response.code).json(response);
      }
    } catch (err) {
      const response = new Response(
        false,
        500,
        'Server error, Please try again later',
      );
      return res.status(response.code).json(response);
    }
  }
}

export default Profile;
