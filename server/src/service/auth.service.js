/*
 * @Description:单独鉴权模块，方便之后直接调取鉴权
 * @version:
 * @Author: camus
 * @Date: 2020-11-28 20:17:23
 * @LastEditors: camus
 * @LastEditTime: 2020-11-28 21:10:02
 */
const connection = require("../app/database");

class authService {
  async checkResource(tableName, resourceId, id) {
    /* 内关联 */
    const statement = `SELECT * FROM ${tableName} WHERE id = ? AND user_id = ?;`;
    const [result] = await connection.execute(statement, [resourceId, id]);
    /* 如果查询结果数组不为空，则返回true */
    return result.length === 0 ? false : true;
  }
}

module.exports = new authService();
