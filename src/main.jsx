import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "../Store";
import "./index.css";
import App from "./App";
import { SYS_NAME } from "../Constants";

document.title = SYS_NAME;

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
