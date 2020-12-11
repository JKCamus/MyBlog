import React, { memo,useEffect } from "react";

import { HashRouter } from "react-router-dom";
import routes from "./router";
import { renderRoutes } from "react-router-config";

import { Provider } from "react-redux";
import store from "./store";
import { changeIsMobileAction } from "./store/global/actionCreators";
// 动效库，用于判断是否是手机
import { Skeleton } from "antd";
import { enquireScreen } from "enquire-js";

import Footer from "components/app-footer/Footer";
import Header from "components/app-header/Header";


export default memo(function App() {
  useEffect(() => {
    enquireScreen((b) => {
      b
        ? store.dispatch(changeIsMobileAction(b))
        : store.dispatch(changeIsMobileAction(false))
    });
  }, []);
  return (
    <Provider store={store}>
      <HashRouter>
        <Skeleton loading={false} active paragraph={{ rows: 5 }}>
          <Header></Header>
          {renderRoutes(routes)}
          <Footer></Footer>
        </Skeleton>
      </HashRouter>
    </Provider>
  );
});
