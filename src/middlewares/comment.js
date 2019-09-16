import models from '../database/models';
import Response from '../helpers/Response';

const { Comment } = models;

export default {
  findComment: async (req, res, next) => {
    const { payload: { id: userId } } = req.payload;
    const { commentId } = req.params;

    const isComment = await Comment.findOne({ where: { id: commentId } });
    if (isComment) {
      if (isComment.userId === userId) {
        req.commentDetails = isComment;
        return next();
      }
      const response = new Response(false, 401, 'You cannot modify this comment');
      return res.status(response.code).json(response);
    }
    const response = new Response(false, 404, 'Comment not found!');
    return res.status(response.status).json(response);
  }
};
