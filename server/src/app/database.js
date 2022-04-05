/*
 * @Description:数据库链接相关配置
 * @version:
 * @Author: camus
 * @Date: 2020-11-24 17:24:57
 * @LastEditors: camus
 * @LastEditTime: 2020-11-25 09:30:56
 */
const mysql = require("mysql2");
const config = require("./config");

/**
 * @description: 创建连接池
 * @param {*}
 * @return {*}
 * @author: camus
 */
const connections = mysql.createPool({
  host: config.MYSQL_HOST,
  port: config.MYSQL_PORT,
  database: config.MYSQL_DATABASE,
  user: config.MYSQL_USER,
  password: config.MYSQL_PASSWORD,
});

connections.getConnection((err, conn) => {
  conn.connect((err) => {
    /* err为空，创建成功 */
    if (err) {
      console.log("fail to connect database...", err);
    } else {
      console.log("Successfully connected to the database,enjoy~~,");
    }
  });
});
/* 将数据库操作通过promise导出 */
module.exports = connections.promise();
