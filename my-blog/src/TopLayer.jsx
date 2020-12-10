import React, { memo, useState, useEffect } from "react";
import { HashRouter } from "react-router-dom";
import routes from "./router";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { changeIsMobileAction } from "./store/global/actionCreators";
import { Skeleton } from "antd";

import { renderRoutes } from "react-router-config";
// 动效库，用于判断是否是手机
import { enquireScreen } from "enquire-js";
import Footer from "components/app-footer/Footer";
import Header from "components/app-header/Header";

export default memo(function TopLayer() {
  const dispatch = useDispatch();
  useEffect(() => {
    enquireScreen((b) => {
      b
        ? dispatch(changeIsMobileAction(b))
        : dispatch(changeIsMobileAction(false));
    });
  }, []);
  return (
    <HashRouter>
      <Skeleton loading={false} active paragraph={{ rows: 5 }}>
        <Header></Header>
        {renderRoutes(routes)}
        <Footer></Footer>
      </Skeleton>
      {/* <Skeleton active paragraph={{ rows: 5 }}></Skeleton>
      <Skeleton active paragraph={{ rows: 5 }}></Skeleton>
      <Skeleton active paragraph={{ rows: 5 }}></Skeleton> */}
    </HashRouter>
  );
});
