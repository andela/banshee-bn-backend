import db from '../database/models';
import Response from '../helpers/Response';

const { AccomodationFeedback, Trip, Stop } = db;

/** Feedback Class */
class Feedback {
  /**
   * @param {req} req
   * @param {res} res
   * @returns {object} object
   */
  static async postAccomodationFeedback(req, res) {
    try {
      const { payload } = req.payload;
      const { id: userId } = payload;

      const {
        reviews, likeDislike, accomodationId, tripId
      } = req.body;

      const trip = await Trip.findOne({ where: { id: tripId } });
      if (userId !== trip.userId) {
        const response = new Response(
          false,
          403,
          'This trip is not associated with this user'
        );
        return res.status(response.code).json(response);
      }

      const stop = await Stop.findOne({ where: { tripId } });
      const { accomodationId: accomodationIdFromDb } = stop;
      if (accomodationId !== accomodationIdFromDb) {
        const response = new Response(
          false,
          403,
          'Invalid accomodation id'
        );
        return res.status(response.code).json(response);
      }
      await AccomodationFeedback.create({
        reviews,
        likeDislike,
        accomodationId,
        tripId,
        userId
      });

      const response = new Response(
        true,
        201,
        'Accomodation Feedback posted successfully',
        {
          feedback: {
            userId, tripId, accomodationId, reviews, likeDislike
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
}

export default Feedback;
