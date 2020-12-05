import React, { memo } from "react";
import Home from 'pages/Home';
// import { Provider } from "react-redux";
// import { renderRoutes } from "react-router-config";

// import routes from "./router";
// import store from "./store";


// import { HashRouter } from "react-router-dom";

export default memo(function App() {
  return (
    // <Provider store={store}>
    //   <HashRouter>
    //     <HYAppHeader />
    //     {renderRoutes(routes)}
    //     <HYAppFooter />
    //     <AppPlayerBar></AppPlayerBar>
    //   </HashRouter>
    // </Provider>
   <Home></Home>
  );
});
