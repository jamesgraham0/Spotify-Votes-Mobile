import React from "react";
import AppNavigation from "./AppNavigation.js";
import { Provider } from "react-redux";
import { store } from "./client/src/redux/store.js";

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
}
