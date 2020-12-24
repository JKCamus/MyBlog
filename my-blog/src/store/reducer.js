import { combineReducers } from "redux-immutable";
// import {combineReducers} from 'redux';
// 设置别名，避免重复
import { reducer as globalReducer } from "./global";
import {reducer as homeReducer} from 'pages/Home/store';

const cReducer = combineReducers({
  global: globalReducer,
  home:homeReducer
});

export default cReducer;
