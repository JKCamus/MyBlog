/* 转成不可变对象 */
import { Map } from "immutable";
/* 默认数据 */
import * as actionTypes from "./constants";

const defaultState = Map({
  photoList: [],
});

function reducer(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.CHANGE_PHOTO_LIST:
      return state.set("photoList", action.photoList);
    case actionTypes.TESTFUNC:
    //  return  { ...state, testFunc: action.payload }
    console.log('', action.test)
      return state.set("testFunc", action.test);
    default:
      return state;
  }
}
export default reducer;
