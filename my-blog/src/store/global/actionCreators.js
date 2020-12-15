import * as actionTypes from "./constants";

export  const changeIsMobileAction = (isMobile) => ({
  type: actionTypes.CHANGE_IS_MOBILE,
  isMobile,
});
export const changePageStyleAction=(routerPath)=>({
  type: actionTypes.CHANGE_PAGE_STYLE,
  routerPath,
})
// export const getSongDetailAction = (isMobile) => {
//   return (dispatch) => {
//       dispatch(changeIsMobileAction(isMobile));
//   };
// };
