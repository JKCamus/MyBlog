/*
 * @Description:
 * @version:
 * @Author: camus
 * @Date: 2021-01-11 21:12:35
 * @LastEditors: camus
 * @LastEditTime: 2021-01-16 22:24:16
 */
const connection = require("../app/database");
const { APP_HOST, APP_PORT } = require("../app/config");

class DemoService {
  async createDemoInfo(
    userId,
    title,
    preview,
    status,
    imgFilename,
    imgMimetype,
    htmlContent = ""
  ) {
    try {
      const statement = `INSERT INTO demo (filename, mimetype, title, htmlName,preview,status,user_id) VALUES (?, ?, ?, ?, ?, ?,?)`;
      const [result] = await connection.execute(statement, [
        imgFilename,
        imgMimetype,
        title,
        htmlContent,
        preview,
        status,
        userId,
      ]);
      return result;
    } catch (error) {
      console.log("DemoService.createDemoInfo", error);
    }
  }
  async getDemoList(page, size) {
    try {
      const statement = `
      SELECT
      d.id id,d.title title,CONCAT('${APP_HOST}:${APP_PORT}/image/demoFiles/',d.filename) img,d.htmlName,CONCAT('${APP_HOST}:${APP_PORT}/fileHosting/demoFiles/',d.htmlName) htmlUrl,d.status,d.mimetype imageMimetype,d.preview,
      JSON_OBJECT('userId', u.id, 'name', u.name,'avatar',CONCAT('${APP_HOST}:${APP_PORT}/demoImages/',a.filename)) author
    FROM demo d
    LEFT JOIN user u ON d.user_id = u.id
		LEFT JOIN avatar a ON a.user_id = u.id
    LIMIT ?, ?;
      `;
      // 字符串
      const [result] = await connection.execute(statement, [
        `${page - 1}`,
        size,
      ]);
      return result;
    } catch (error) {
      console.log("DemoController.getDemoList", error);
    }
  }

  /**
   * @description: 上传Notes，修改
   */
  async updateDemo(updateData) {
    const {
      id,
      title,
      preview,
      status,
      imgFilename,
      imgMimetype,
      htmlFilename,
    } = updateData;
    try {
      const statement = `UPDATE demo
      SET title = ?,
      preview = ?,
      htmlName = ?,
      STATUS = ?
      ${imgFilename ? ",filename = ?," : ""}
      ${imgFilename ? "mimetype = ?" : ""}
      WHERE
        id = ?;`;

      const executeData = imgFilename
        ? [title, preview, htmlFilename, status, imgFilename, imgMimetype, id]
        : [title, preview, htmlFilename, status, id];
      const [result] = await connection.execute(statement, executeData);
      return result;
    } catch (error) {
      console.log("fileService.updatePhoto", error);
    }
  }
  async getClearNotesList() {
    try {
      const statementStatus = `SELECT filename,htmlName  FROM demo WHERE status = 0 ;`;
      const statementClearHtml = `SELECT htmlName,filename FROM demo `;
      const [clearStatus] = await connection.execute(statementStatus);
      const [clearHtml] = await connection.execute(statementClearHtml);
      return {
        clearHtml,
        clearStatus,
      };
    } catch (error) {
      console.log("fileService.getClearPhotoList", error);
    }
  }

  async clearNotes() {
    try {
      const statement = `DELETE FROM demo WHERE status = 0;`;
      const [result] = await connection.execute(statement);

      return result;
    } catch (error) {
      console.log("fileService.getClearPhotoList", error);
    }
  }
}

module.exports = new DemoService();
