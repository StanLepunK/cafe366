// REACT
import * as React from "react";
// GATSBY SHOPIFY
import { StoreProvider } from "./src/context/store_context";
import "./src/styles/reset.css";
import "./src/styles/variables.css";
import "./src/styles/global.css";

export const wrapRootElement = ({ element }) => (
  <StoreProvider>{element}</StoreProvider>
);