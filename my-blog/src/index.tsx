import React from "react";
import ReactDOM from "react-dom";
import { disableReactDevTools } from "utils/developerToolClose";
import "@/assets/css/reset.less";

import App from "./App";
if (process.env.NODE_ENV === "production") {
  disableReactDevTools();
}

ReactDOM.render(<App />, document.getElementById("root"));
