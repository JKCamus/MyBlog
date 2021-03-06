import * as actionTypes from "./constants";
import { login } from "services/login";
import { message } from "antd";
import { setToken } from "utils/token";

export const changeIsMobileAction = (isMobile) => ({
  type: actionTypes.CHANGE_IS_MOBILE,
  isMobile,
});
export const loggedAction = (userInfo) => ({
  type: actionTypes.LOGGED,
  userInfo,
});
/**
 * @description: 登录、保存token
 * @param {*} loginAction
 */
export const loginAction = (info, resolve) => {
  return async (dispatch) => {
    try {
      const userInfo = await login(info);
      if (userInfo) {
        dispatch(loggedAction(userInfo));
        setToken(userInfo);
        resolve(false);
      } else {
        resolve(true);
      }
    } catch (error) {
      message.error(error.message)
      console.log("loginAction", error.message);
    }
  };
};
