import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "@fontsource/teko/latin-500.css";
import "@fontsource/teko/latin-600.css";
import "@fontsource/teko/latin-700.css";
import "./styles.css";
import "./styles/component-frames.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);