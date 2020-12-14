import React from "react";

import { Redirect } from "react-router-dom";
// import Home from 'pages/Home';
import CLayout from 'pages/Layout';
import Demo from 'pages/Demo';
import DragChart from 'pages/Demo/drag-charts';

const routes = [
  {
    path: "/",
    exact: true,
    // component: JKDiscover,
    render: () => (
      <Redirect to="/home" /> //刚进入时，重定向，到discover，需要引入react
    ),
  },
  {
    path:"/home",
    component: CLayout,
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


];
export default routes;
