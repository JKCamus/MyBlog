import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducer from "./reducer";

//配置dev_tools
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// dev_tools 生产环境关闭
const composeEnhancers =
  (process.env.NODE_ENV !== "production" &&
    typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
export default store;
