import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Store, StoreProvider } from "./store";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { createStoreHook, Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StoreProvider>
    <PayPalScriptProvider deferLoading={true}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PayPalScriptProvider>
  </StoreProvider>
);
