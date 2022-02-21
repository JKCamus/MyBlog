/*
 * @Description:
 * @version:
 * @Author: camus
 * @Date: 2020-11-29 14:15:01
 * @LastEditors: camus
 * @LastEditTime: 2020-12-02 10:19:13
 */
const connection = require("../app/database");

class CommentService {
  async create(content, momentId, userId) {
    try {
      const statement = `INSERT INTO comment (content, moment_id, user_id) VALUES (?, ?, ?);`;
      const [result] = await connection.execute(statement, [
        content,
        momentId,
        userId,
      ]);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async reply(momentId, content, userId, commentId) {
    try {
      const statement = `INSERT INTO comment (content, moment_id, user_id, comment_id) VALUES (?, ?, ?, ?);`;
      const [result] = await connection.execute(statement, [
        content,
        momentId,
        userId,
        commentId,
      ]);
      return result;
    } catch (error) {
      console.log(error);
    }
  }
  async update(content, commentId) {
    try {
      const statement = `UPDATE comment SET content = ? WHERE id = ?`;
      const [result] = await connection.execute(statement, [
        content,
        commentId,
      ]);
      return result;
    } catch (error) {
      console.log("CommentService.update", error);
    }
  }

  async remove(commentId) {
    try {
      const statement = `DELETE FROM comment WHERE id = ?`;
      const [result] = await connection.execute(statement, [commentId]);
      return result;
    } catch (error) {
      console.log("CommentService.remove", error);
    }
  }

  async getCommentsByMomentId(commentId) {
    try {
      const statement = `
      SELECT
        m.id, m.content, m.comment_id commendId, m.createAt createTime,
        JSON_OBJECT('id', u.id, 'name', u.name) user
      FROM comment m
      LEFT JOIN user u ON u.id = m.user_id
      WHERE moment_id = ?;
    `;
      const [result] = await connection.execute(statement, [commentId]);
      return result;
    } catch (error) {
      console.log("CommentService.getCommentsByMomentId", error);
    }
  }
}
module.exports = new CommentService();
