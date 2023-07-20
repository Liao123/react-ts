import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

function APP() {
  useEffect(() => {
    console.log(11121122121, process.env.NODE_ENV);
  });

  return (
    <div className="App">
      这是APP
      <Outlet />
    </div>
  );
}

export default APP;
