/*
 * @Description:
 * @version:
 * @Author: camus
 * @Date: 2022-02-22 11:32:11
 * @LastEditors: camus
 * @LastEditTime: 2022-07-21 21:10:50
 */

const errorTypes = require("../constants/error-types");

const wiiFullError = async (ctx, next) => {
  try {
    // if (Math.random() < 0.3) {
    //   // 概率报错
    //   console.log("合并报错了");
    //   const error = new Error(errorTypes.WILLFUL_ERROR);
    //   return ctx.app.emit("error", error, ctx);
    // }
    await next();
  } catch (error) {
    const err = new Error(errorTypes.WILLFUL_ERROR);
    return ctx.app.emit("error", err, ctx);
  }
};

module.exports = { wiiFullError };
