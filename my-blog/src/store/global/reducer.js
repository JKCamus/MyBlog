/* 转成不可变对象 */
import {Map} from "immutable";
/* 默认数据 */
import * as actionTypes from './constants';
// import {changeIsMobileAction} from './actionCreators';

const defaultState = Map({
  isMobile: false,
  routerPath:'/home'
});

function reducer(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.CHANGE_IS_MOBILE:
      return state.set("isMobile",action.isMobile)
      case actionTypes.CHANGE_PAGE_STYLE:
        return state.set("routerPath",action.routerPath)
    default:
      return state;
  }
}
export default reducer;
