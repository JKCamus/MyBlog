const commentService = require("../service/comment.service");

/*
 * @Description:
 * @version:
 * @Author: camus
 * @Date: 2020-11-29 14:04:56
 * @LastEditors: camus
 * @LastEditTime: 2020-12-02 10:29:49
 */
const CommentService = require("../service/comment.service");
class CommentController {
  async create(ctx, next) {
    try {
      const { id } = ctx.user;
      const { content, momentId } = ctx.request.body;
      const result = await CommentService.create(content, momentId, id);
      ctx.body = result;
    } catch (error) {
      console.log(error);
    }
  }
  async reply(ctx, next) {
    try {
      const { momentId, content } = ctx.request.body;
      const { commentId } = ctx.params;
      const { id } = ctx.user;
      const result = await CommentService.reply(
        momentId,
        content,
        id,
        commentId
      );
      ctx.body = result;
    } catch (error) {
      console.log(error);
    }
  }
  async update(ctx, next) {
    try {
      const { commentId } = ctx.params;
      const { content } = ctx.request.body;
      const result = await CommentService.update(content, commentId);
      ctx.body = result;
    } catch (error) {
      console.log(error);
    }
  }
  async remove(ctx, next) {
    try {
      const { commentId } = ctx.params;
      const result = await CommentService.remove(commentId);
      ctx.body = result;
    } catch (error) {
      console.log("CommentController.remove", error);
    }
  }

  async getList(ctx, next) {
    try {
      const { commentId } = ctx.query;
      if (!commentId) throw new Error();
      const result = await CommentService.getCommentsByMomentId(commentId);
      ctx.body = result;
    } catch (error) {
      console.log("CommentController.getList", error);
    }
  }
}

module.exports = new CommentController();
