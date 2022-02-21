/*
 * @Description:
 * @version:
 * @Author: camus
 * @Date: 2020-11-24 17:04:31
 * @LastEditors: camus
 * @LastEditTime: 2020-12-03 20:18:50
 */
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");

dotenv.config();

const PRIVATE_KEY = fs.readFileSync(
  path.resolve(__dirname, "./keys/private.key")
);
const PUBLIC_KEY = fs.readFileSync(
  path.resolve(__dirname, "./keys/public.key")
);

module.exports = {
  APP_PORT,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_DATABASE,
  MYSQL_USER,
  MYSQL_PASSWORD,
  APP_HOST
} = process.env;

module.exports.PRIVATE_KEY = PRIVATE_KEY;
module.exports.PUBLIC_KEY = PUBLIC_KEY;
