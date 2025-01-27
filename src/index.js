import React from "react";
import ReactDom from "react-dom/client";
import App from "./app";
import { BrowserRouter } from "react-router";

let root = ReactDom.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
