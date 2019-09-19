import db from '../database/models';
import Response from '../helpers/Response';

const { Accomodation, Rating } = db;

/** Rating Class */
class Ratings {
  /**
   * @param {req} req
   * @param {res} res
   * @returns {object} object
   */
  static async create(req, res) {
    try {
      const { payload } = req.payload;
      const { id: userId } = payload;

      const {
        accomodationId, ratingValue
      } = req.body;

      const accomodation = await Accomodation.findOne({ where: { id: accomodationId } });
      if (!accomodation) {
        const response = new Response(
          false,
          404,
          'This accomodation does not exist'
        );
        return res.status(response.code).json(response);
      }

      const previousRating = await Rating.findOne(
        {
          where: { userId, accomodationId }
        }
      );

      if (!previousRating) {
        const ratingDetails = await Rating.create({
          userId,
          accomodationId,
          ratingValue
        });
        const response = new Response(
          true,
          201,
          'Thank you for rating this accomodation',
          { rating: ratingDetails }
        );
        return res.status(response.code).json(response);
      }
      const ratingDetails = await Rating.update(
        { ratingValue },
        {
          where: { userId, accomodationId },
          returning: true,
        }
      );
      const response = new Response(
        true,
        200,
        'Thank you for rating this accomodation',
        { rating: ratingDetails }
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
}

export default Ratings;
