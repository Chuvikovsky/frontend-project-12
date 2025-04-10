import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import "./css/styles.css";
// import "./css/styles.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import App from "./App.jsx";
import store from "./store/index.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
