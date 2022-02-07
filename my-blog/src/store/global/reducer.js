/* 转成不可变对象 */
import {Map} from "immutable";
import * as actionTypes from './constants';

const defaultState = Map({
  isMobile: false,
  userInfo:{}
});


function reducer(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.CHANGE_IS_MOBILE:
      return state.set("isMobile",action.isMobile)
      case actionTypes.LOGGED:
        return state.set("userInfo",action.userInfo)
    default:
      return state;
  }
}
export default reducer;
