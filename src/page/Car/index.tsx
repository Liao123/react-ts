import React, { useState, useEffect } from "react";
import "./index.less";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { slice1Actions } from "@/store/counter/store1";
import { Button } from "antd";
export interface Props {
  enthusiasmLevel?: number;
}

function Car({ enthusiasmLevel = 1 }: Props) {
  const navigate = useNavigate();
  const count = useSelector((state: any) => {
    return state.slice1.value;
  });
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(11121122121, process.env.NODE_ENV);
  });

  const goHello = () => {
    navigate("/hello?a=1");
  };

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
              <Button onClick={goHello}>car去hello</Button>
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
