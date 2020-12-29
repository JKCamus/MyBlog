import React from "react";

import { Redirect } from "react-router-dom";
// import Home from 'pages/Home';
import Home from "pages/Home";
import Demo from "pages/Demo";
import DragChart from "pages/Demo/drag-charts";
import Login from "components/login";
import Profile from '@/pages/Profile';

const routes = [
  {
    path: "/",
    exact: true,
    render: () => (
      <Redirect to="/home" /> //刚进入时，重定向，到home，需要引入react
    ),
  },
  {
    path: "/home",
    component: Home,
    exact: true,
    // routes:[
    //   {
    //     path: "/discover",
    //     exact: true,
    //     render: () => <Redirect to="/discover/recommend" />,
    //   },

    // ],
  },
  {
    path: "/demo",
    exact: true,
    component: Demo,
  },
  {
    path: "/charts",
    exact: true,
    component: DragChart,
  },
  {
    path: "/login",
    exact: true,
    component: Login,
  },
  // {
  //   path: "/profile",
  //   exact: true,
  //   component: Profile,
  // },

];
export default routes;
