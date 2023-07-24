import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import store from "./store";
import { Provider } from "react-redux";

function APP() {
  useEffect(() => {
    console.log(11121122121, process.env.NODE_ENV);
  });

  return (
    <div className="App">
      这是APP
      <Provider store={store}>
        <Outlet />
      </Provider>
    </div>
  );
}

export default APP;
