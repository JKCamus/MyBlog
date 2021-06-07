import React from "react";

import { Redirect } from "react-router-dom";
// import Home from 'pages/Home';
// import Demo from "pages/Demo";
import DragChart from "pages/Demo/drag-charts";
import Login from "components/login";
import MyUseRef from "pages/Demo/useRefHook";
const Home = React.lazy(() => import("@/pages/Home"));
const Notes = React.lazy(() => import("pages/Demo"));
const About=React.lazy(()=>import('pages/About'))

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
  },
  {
    path: "/notes",
    component: Notes,
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
  {
    path: "/about",
    exact: true,
    component: About,
  },

  // {
  //   path: "/use",
  //   exact: true,
  //   component: MyUseRef,
  // },
];
export default routes;
