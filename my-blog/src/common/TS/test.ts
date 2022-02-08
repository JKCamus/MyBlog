/*
 * @Description:
 * @version:
 * @Author: camus
 * @Date: 2022-02-07 17:21:39
 * @LastEditors: camus
 * @LastEditTime: 2022-02-07 17:24:39
 */
export type MyPick<T, K extends keyof T> = {
  [key in K]: T[key];
};
