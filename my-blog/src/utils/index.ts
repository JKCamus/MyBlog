import { useEffect, useState } from "react";

/*
 * @Description:
 * @version:
 * @Author: camus
 * @Date: 2021-06-08 22:37:50
 * @LastEditors: camus
 * @LastEditTime: 2021-07-19 21:01:25
 */
/**
 * @description: mounted hook，mounted的时候回调，更新不回调
 * @param {function} callback
 */
export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, []);
};
/**
 * @description: useDebounce 防抖hook
 * @param {any} value
 * @param {number} delay
 */
export const useDebounce = (value: any, delay: number) => {
  const [debounceValue, setDebounceValue] = useState(value);
  useEffect(() => {
    const timeout = setTimeout(() => setDebounceValue(value), delay);
    return () => {
      return () => clearTimeout(timeout);
    };
  }, [value, delay]);
  return debounceValue;
};

//获取文本宽度
// export const getTextWidth = (
//   text: string,
//   fontWeight: string = DEFAULT_FONT_WEIGHT,
//   fontSize: string = DEFAULT_FONT_SIZE,
//   fontFamily: string = DEFAULT_FONT_FAMILY
// ): number => {
//   const canvas = utilCanvas || (utilCanvas = document.createElement('canvas'))
//   const context = canvas.getContext('2d')
//   context.font = `${fontWeight} ${fontSize} ${fontFamily}`
//   const metrics = context.measureText(text)
//   return Math.ceil(metrics.width)
// }
