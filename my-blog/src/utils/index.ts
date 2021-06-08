import { useEffect } from "react";

/*
 * @Description:
 * @version:
 * @Author: camus
 * @Date: 2021-06-08 22:37:50
 * @LastEditors: camus
 * @LastEditTime: 2021-06-08 22:40:58
 */
export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, []);
};
