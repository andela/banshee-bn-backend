import models from '../database/models';
import Response from '../helpers/Response';
import addNotification from '../helpers/addNotification';
import SearchDatabase from '../helpers/SearchDatabase';
import inAppBot from '../helpers/socektIo/inAppBot';

const { Comment, Trip } = models;

/**
 * @class
 * @description controller class for comments
 * @exports CommentController
 */
class CommentController {
  /**
  * Post a Comment
  * Route: POST: /trips/comments
  * @param {object} req - HTTP Request object
  * @param {object} res - HTTP Response object
  * @return {res} res - HTTP Response object
  * @memberof CommentController
 */
  static async createComment(req, res) {
    const { payload: { id: userId, companyId } } = req.payload;
    const { tripId } = req.params;
    const { body } = req.body;
    try {
      const getTrip = await Trip.findOne({
        where: { id: tripId },
        returning: true
      });
      if (!getTrip) {
        const response = new Response(false, 404, 'Trip does not exist');
        return res.status(response.status).json(response);
      }

      const newComment = await Comment.create({ userId, tripId, body });
      const admins = await SearchDatabase.findAdminUsersWithNotificationOpt(
        ['travel admin', 'manager'], { inAppOpt: true }, { companyId }
      );
      const user = await SearchDatabase.findUser(userId);
      const tripRequester = await SearchDatabase.findUser(getTrip.userId);
      const emails = admins.map((admin) => admin.email);
      if (emails && user && tripRequester) {
        const message = `${user.firstName} ${user.lastName} commented on ${tripRequester.firstName} ${tripRequester.lastName} trip request(${tripId})`;
        const recipients = [...emails, tripRequester.email];
        await addNotification(tripId, message, recipients);
        inAppBot.send('New comment', { inAppRecipients: recipients, message, companyId }, 'comment');
      }

      const response = new Response(
        true,
        201,
        'Comment posted successfully',
        newComment
      );
      return res.status(response.code).json(response);
    } catch (error) {
      const response = new Response(false, 500, error.message);
      return res.status(response.code).json(response);
    }
  }
}

export default CommentController;
