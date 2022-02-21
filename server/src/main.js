/*
 * @Description:
 * @version:
 * @Author: camus
 * @Date: 2020-11-24 16:42:34
 * @LastEditors: camus
 * @LastEditTime: 2020-11-24 17:30:42
 */
const app =require('./app')
require('./app/database');

const config = require("./app/config");
// 最好不要在程序里写死，避免泄露并且更加易于维护
app.listen(config.APP_PORT, () => {
  console.log(`camushub start at prot: ${config.APP_PORT}`);
});
