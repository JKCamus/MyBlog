import React, { memo } from "react";
import Home from "pages/Home";
import { HashRouter } from "react-router-dom";
// import { Provider } from "react-redux";
import routes from "./router";
import { renderRoutes } from "react-router-config";
import Footer0 from "components/app-footer/Footer0";
// import store from "./store";
export default memo(function App() {
  return (
    // <Provider store={store}>
    <HashRouter>
      {/* // <HYAppHeader /> */}
      {renderRoutes(routes)}
      <Footer0></Footer0>
      {/* <Home></Home> */}
    </HashRouter>
    // </Provider>
  );
});
