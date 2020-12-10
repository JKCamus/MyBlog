import React, { memo } from "react";
import { Provider } from "react-redux";
import store from "./store";

import TopLayer from "./TopLayer";

export default memo(function App() {
  return (
    <Provider store={store}>
      <TopLayer></TopLayer>
    </Provider>
  );
});
