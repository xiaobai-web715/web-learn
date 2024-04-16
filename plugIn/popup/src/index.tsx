import React from "react";
import ReactDOM from "react-dom/client";
import Panel from "./panel"

const root = ReactDOM.createRoot(document.getElementById("popup") as HTMLElement);
root.render(
  <React.StrictMode>
    <Panel />
  </React.StrictMode>
);
