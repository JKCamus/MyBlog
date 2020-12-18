/* 转成不可变对象 */
import {Map} from "immutable";
/* 默认数据 */
import * as actionTypes from './constants';
// import {changeIsMobileAction} from './actionCreators';

const defaultState = Map({
  isMobile: false,
  showLogin:false
});

function reducer(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.CHANGE_IS_MOBILE:
      return state.set("isMobile",action.isMobile)
      case actionTypes.CHANGE_SHOW_LOGIN:
        return state.set("showLogin",action.showLogin)
    default:
      return state;
  }
}
export default reducer;
