import React from "react";

import { Redirect } from "react-router-dom";
// import Home from 'pages/Home';
// import Demo from "pages/Demo";
import DragChart from "@/pages/Note/drag-charts";
import Login from "components/login";
import MyUseRef from "@/pages/Note/useRefHook";
const Home = React.lazy(() => import("@/pages/Home"));
const Notes = React.lazy(() => import("@/pages/Note"));
const About = React.lazy(() => import("@/pages/Demo"));

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
    path: "/demo",
    component: About,
  },

  // {
  //   path: "/use",
  //   exact: true,
  //   component: MyUseRef,
  // },
];
export default routes;
