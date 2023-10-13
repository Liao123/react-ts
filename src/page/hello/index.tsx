import React, { useState, useEffect } from "react";
import "./index.less";
import { Link, Outlet } from "react-router-dom";

export interface Props {
  enthusiasmLevel?: number;
}

function Hello({ enthusiasmLevel = 1 }: Props) {
  useEffect(() => {
    console.log(11121122121, process.env.NODE_ENV);
  });

  if (enthusiasmLevel <= 0) {
    throw new Error("You co222uld be a little more enthusiastic. :D");
  }

  return (
    <div className="hello">
      <div className="greeting color-red">
        Hello {getExclamationMarks(enthusiasmLevel)}
        <Outlet />
        <img
          style={{ width: "100px" }}
          src={require("@/static/img/empty.png")}
        ></img>
        <nav>
          <ul>
            <li>
              <Link to={`..`}>回hello</Link>
            </li>
            <li>
              <a href={`/contacts`}>Your Friend</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Hello;

// helpers

function getExclamationMarks(numChars: number) {
  return Array(numChars + 1).join("!");
}
