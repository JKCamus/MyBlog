/*
 * @Description:
 * @version:
 * @Author: camus
 * @Date: 2022-02-07 20:00:09
 * @LastEditors: camus
 * @LastEditTime: 2022-03-27 16:45:05
 */
export type MyPick<T,K extends keyof T>={
  [key in K]:T[key]
}


// 根据 Github 用户名获取用户信息
// function calculateDaysBetweenDates(begin, end) {
