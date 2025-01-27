import React from "react";
import ReactDom from "react-dom/client";
import App from "./app";
import { BrowserRouter } from "react-router";

const isDevelopment = process.env.NODE_ENV === "development";

let root = ReactDom.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter basename={isDevelopment ? "/" : "Spotlight-with-react"}>
    <App />
  </BrowserRouter>
);
