/*
 * @Description:
 * @version:
 * @Author: camus
 * @Date: 2021-09-17 16:40:22
 * @LastEditors: camus
 * @LastEditTime: 2021-09-17 16:41:28
 */
export const getRandomNumberByRange = (start: number, end: number) => {
  return Math.round(Math.random() * (end - start) + start);
};

export const sum = (x: number, y: number) => {
  return x + y;
};

export const square = (x: number) => {
  return x * x;
};
