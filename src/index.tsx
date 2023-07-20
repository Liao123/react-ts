import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import route from "@/router";
import React, { Suspense } from "react";
import Hello from "./page/Hello";
import Car from "./page/Car";

const router = createBrowserRouter([...route], {
  basename: "/", //域名后面接什么文件夹（不是根目录）
});

const App = () => {
  return (
    // 报错组件 主要是自动发出 被弃用api的警告
    <React.StrictMode>
      <Suspense fallback={<div>Loading...</div>}>
        <RouterProvider router={router}></RouterProvider>
      </Suspense>
    </React.StrictMode>
  );
};

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
