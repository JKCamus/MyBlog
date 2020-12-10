import { combineReducers } from "redux-immutable";
// import {combineReducers} from 'redux';
// 设置别名，避免重复
import { reducer as globalReducer } from "./global";

const cReducer = combineReducers({
  global: globalReducer,
});

export default cReducer;
