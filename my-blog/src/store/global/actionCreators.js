import * as actionTypes from "./constants";
import { login } from "services/login";
import { message } from "antd";

export const changeIsMobileAction = (isMobile) => ({
  type: actionTypes.CHANGE_IS_MOBILE,
  isMobile,
});
export const loggedAction = (userInfo) => ({
  type: actionTypes.LOGGED,
  userInfo,
});

export const loginAction = (data) => {
  return async (dispatch) => {
    try {
      const userInfo = await login(data);
      if (userInfo) {
        dispatch(loggedAction(userInfo));
        localStorage.setItem("USER", JSON.stringify(userInfo));
      }
    } catch (error) {
      console.log("loginAction", error);
    }
  };
};
// export const getSongDetailAction = (isMobile) => {
//   return (dispatch) => {
//       dispatch(changeIsMobileAction(isMobile));
//   };
// };
