/*
 * @Description:
 * @version:
 * @Author: camus
 * @Date: 2022-02-07 20:00:09
 * @LastEditors: camus
 * @LastEditTime: 2022-02-07 20:01:44
 */
export type MyPick<T,K extends keyof T>={
  [key in K]:T[key]
}
