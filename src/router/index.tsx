import React from "react";
// import Hello from "../page/Hello";
// import Car from "../page/Car";
import ErrorPage from "../page/error";
import App from "@/App";

const Hello = React.lazy(() => import("../page/hello"));
const Car = React.lazy(() => import("../page/Car"));

const router: any[] = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Car />,
        // lazy: () => require("../page/Car"),
      },
      {
        path: "hello",
        element: <Hello />,
      },
    ],
  },
];
export default router;
