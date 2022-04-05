/* 转成不可变对象 */
import { Map } from "immutable";
/* 默认数据 */
import * as actionTypes from "./constants";

const defaultState = Map({
  photoList: [],
  shouldPhotoRender:true
});

function reducer(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.CHANGE_PHOTO_LIST:
      return state.set("photoList", action.photoList);
    case actionTypes.CHANGE_PHOTO_RENDER:
      return state.set("shouldPhotoRender", action.shouldPhotoRender);
    default:
      return state;
  }
}
export default reducer;
