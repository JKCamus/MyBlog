import * as actionTypes from "./constants";

export  const changeIsMobileAction = (isMobile) => ({
  type: actionTypes.CHANGE_IS_MOBILE,
  isMobile,
});
export const changeShowLoginAction=(showLogin)=>({
  type: actionTypes.CHANGE_SHOW_LOGIN,
  showLogin,
})
// export const getSongDetailAction = (isMobile) => {
//   return (dispatch) => {
//       dispatch(changeIsMobileAction(isMobile));
//   };
// };
