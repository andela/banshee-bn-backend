import models from '../database/models';
import Response from '../helpers/Response';

const { User } = models;

export default {
  savePreference: async (req, res, next) => {
    const { payload: { id } } = req.payload;
    try {
      const user = await User.findOne({
        where: { id },
        attributes: ['firstName', 'lastName', 'gender', 'role', 'favorites']
      });
      if (!user) {
        const response = new Response(false, 404, 'User does not exist');
        return res.status(response.code).json(response);
      }

      if (user.favorites === false) {
        const {
          firstName, lastName, gender, favorites
        } = req.body;
        await User.update(
          {
            firstName, lastName, gender, favorites
          },
          {
            where: { id },
            returning: true
          }
        );
        const profile = { ...req.body, };
        req.travelDetails = profile;
        next();
      }

      const travelDetails = user.dataValues;
      req.travelDetails = travelDetails;
      next();
    } catch (error) {
      const response = new Response(false, 500, 'Server error', error.message);
      return res.status(response.code).json(response);
    }
  }
};
