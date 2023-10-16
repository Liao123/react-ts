import React, { useState, useEffect } from "react";
import "./index.less";
import { Link, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { slice1Actions } from "@/store/counter/store1";
export interface Props {
  enthusiasmLevel?: number;
}

function Car({ enthusiasmLevel = 1 }: Props) {
  const count = useSelector((state: any) => {
    return state.slice1.value;
  });
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(11121122121, process.env.NODE_ENV);
  });

  if (enthusiasmLevel <= 0) {
    throw new Error("You co222uld be a little more enthusiastic. :D");
  }

  return (
    <div className="Car">
      <div className="greeting color-red">
        car
        <img
          style={{ width: "100px" }}
          src={require("@/static/img/empty.png")}
        ></img>
        <nav>
          <ul>
            <li>
              <Link to={`/hello`}>去hello</Link>
            </li>
            <li>
              <a href={`/contacts/2`}>Your Friend</a>
            </li>
          </ul>
          <button
            aria-label="Increment value"
            onClick={() => dispatch(slice1Actions.increment(1))}
          >
            Increment
          </button>
          <span>{count}</span>
          <button
            aria-label="Decrement value"
            onClick={() => dispatch(slice1Actions.decrement(2))}
          >
            Decrement
          </button>
        </nav>
      </div>
    </div>
  );
}

export default Car;
