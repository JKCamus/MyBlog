/*
 * @Description:root
  引入路由，redux等配置
  再此处分发action只需要直接使用store中的dispatch方法就行，此处没有context
 * @version:
 * @Author: camus
 * @Date: 2020-11-29 19:34:23
 * @LastEditors: camus
 * @LastEditTime: 2021-02-25 16:26:55
 */
import React, { memo, useEffect, useState, Suspense } from "react";

import { HashRouter, BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import routes from "./router";

// import { renderRoutes } from "react-router-config";
import { Provider } from "react-redux";
import store from "./store";
import { changeIsMobileAction } from "./store/global/actionCreators";
// 动效库，用于判断是否是手机
import { Skeleton } from "antd";
import { enquireScreen } from "enquire-js";
import AuthorizedRoute from "@/router/AuthorizedRoute";
import privateRoutes from "@/router/privateRoutes";

// import Footer from "src/pages/Home/node_modules/components/app-footer/Footer";

import Header from "components/app-header/Header";
import Login from "components/login";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  useEffect(() => {
    enquireScreen((b) => {
      b ? store.dispatch(changeIsMobileAction(b)) : store.dispatch(changeIsMobileAction(false));
    });
  }, []);
  return (
    <Provider store={store}>
      <HashRouter>
        <Header setShowLogin={setShowLogin}></Header>
        {showLogin && <Login setShowLogin={setShowLogin}></Login>}
        <Switch>
          <Suspense fallback={<Skeleton active paragraph={{ rows: 30}}/>}>
            {routes.map(({ path, component, ...routes }) => (
              <Route key={path} path={path} component={component} {...routes} />
            ))}
          </Suspense>
          {privateRoutes.map((route) => (
            <AuthorizedRoute
              key={route.path}
              {...route}
              user={{ role: ["user"] }}
            ></AuthorizedRoute>
          ))}
        </Switch>
      </HashRouter>
    </Provider>
  );
};

export default App;
