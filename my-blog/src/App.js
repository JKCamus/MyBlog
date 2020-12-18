/*
 * @Description:root
  引入路由，redux等配置
  再此处分发action只需要直接使用store中的dispatch方法就行，此处没有context
 * @version:
 * @Author: camus
 * @Date: 2020-11-29 19:34:23
 * @LastEditors: camus
 * @LastEditTime: 2020-12-18 09:22:16
 */
import React, { memo, useEffect, useState } from "react";

import { HashRouter } from "react-router-dom";
import routes from "./router";
import { renderRoutes } from "react-router-config";
import { useSelector, shallowEqual } from "react-redux";

import { Provider } from "react-redux";
import store from "./store";
import { changeIsMobileAction } from "./store/global/actionCreators";
// 动效库，用于判断是否是手机
import { Skeleton } from "antd";
import { enquireScreen } from "enquire-js";

import Footer from "components/app-footer/Footer";
import Header from "components/app-header/Header";
import Login from "components/login";

const App = () => {

  const [showLogin, setShowLogin] = useState(false);
  useEffect(() => {
    enquireScreen((b) => {
      b
        ? store.dispatch(changeIsMobileAction(b))
        : store.dispatch(changeIsMobileAction(false));
    });
  }, []);
  return (
    <Provider store={store}>
      <HashRouter>
      <Header setShowLogin={setShowLogin}></Header>
        {showLogin && <Login></Login>}
        {renderRoutes(routes)}
        {/* <Footer></Footer> */}
      </HashRouter>
    </Provider>
  );
};
export default App;
