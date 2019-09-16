import models from '../database/models';
import Response from '../helpers/Response';

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
    const { payload: { id: userId } } = req.payload;
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

  /**
  * Delete a Comment
  * Route: DELETE: /trips/comments/:commentId
  * @param {object} req - HTTP Request object
  * @param {object} res - HTTP Response object
  * @return {object} empty res - HTTP Response object
  * @memberof CommentController
 */
  static async deleteComment(req, res) {
    const { commentId } = req.params;
    try {
      await Comment.update(
        { deleted: true, },
        { where: { id: commentId } }
      );
      const response = new Response(true, 200, 'Comment deleted!');
      return res.status(response.code).json(response);
    } catch (error) {
      const response = new Response(false, 500, error.message);
      return res.status(response.code).json(response);
    }
  }
}

export default CommentController;
