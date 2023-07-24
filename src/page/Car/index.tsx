import React, { useState, useEffect } from "react";
import "./index.less";
import { Link, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "@/store/counter/counterSlice";
export interface Props {
  enthusiasmLevel?: number;
}

function Car({ enthusiasmLevel = 1 }: Props) {
  const count = useSelector((state: any) => {
    return state.value;
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
            onClick={() => dispatch(increment())}
          >
            Increment
          </button>
          <span>{count}</span>
          <button
            aria-label="Decrement value"
            onClick={() => dispatch(decrement())}
          >
            Decrement
          </button>
        </nav>
      </div>
    </div>
  );
}

export default Car;
