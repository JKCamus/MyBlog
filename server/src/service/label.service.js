/*
 * @Description:
 * @version:
 * @Author: camus
 * @Date: 2020-12-02 14:02:40
 * @LastEditors: camus
 * @LastEditTime: 2020-12-02 14:52:16
 */
const connection = require("../app/database");

class LabelService {
  async create(name) {
    try {
      const statement = `INSERT INTO label (name) VALUES (?);`;
      const [result] = await connection.execute(statement, [name]);
      return result;
    } catch (error) {
      console.log("LabelService.create", error);
    }
  }
  async getList(page, size) {
    try {
      const statement = `SELECT * FROM label LIMIT ?, ?;`;
      const [result] = await connection.execute(statement, [page, size]);
      return result;
    } catch (error) {
      console.log("LabelService.create", error);
    }
  }
  async getLabelByName(name) {
    try {
      const statement = `SELECT * FROM label WHERE name = ?;`;
      const [result] = await connection.execute(statement, [name]);
      return result[0];
    } catch (error) {
      console.log("LabelService.getLabelByName", error);
    }
  }
}
module.exports = new LabelService();
