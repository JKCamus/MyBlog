/*
 * @Description:
 * @version:
 * @Author: camus
 * @Date: 2020-11-26 10:01:38
 * @LastEditors: camus
 * @LastEditTime: 2020-11-26 10:40:51
 */
const crypto = require("crypto");
const md5password = (password) => {
  // md5为对象
  const md5 = crypto.createHash("md5");
  /**
   * @description:  md5.update(password)生成的为对象，然后里面的方法digest默认返回2进制的buffer，传入hex返回16进制
   * @param {*}password 字符串
   * @author: camus
   */

  const result = md5.update(password).digest("hex");
  return result;
};
module.exports = md5password;
