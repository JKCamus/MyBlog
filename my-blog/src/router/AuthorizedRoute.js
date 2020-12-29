/*
 * @Description:
 * @version:
 * 当前路由鉴权使用token过期方法
 * 但是预埋了user的身份鉴权
 * @Author: camus
 * @Date: 2020-12-27 14:21:52
 * @LastEditors: camus
 * @LastEditTime: 2020-12-28 21:24:00
 */
import React from "react";
import { Route, Redirect } from "react-router-dom";
import checkLogin from "utils/checkLogin";
import { message } from "antd";
const AuthorizedRoute = (props) => {
  const {
    user: { role: userRole },
    role: routerRole,
    backUrl,
    ...otherProps
  } = props;
  if (checkLogin()) {
    return <Route {...otherProps}></Route>;
  } else {
    message.info("Please login");
    return <Redirect to={backUrl}></Redirect>;
  }
};
export default AuthorizedRoute;
