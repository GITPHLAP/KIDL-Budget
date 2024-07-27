import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Administration from "./containers/overview/administration";
import Overview from "./containers/overview/overview";
import Transactions from "./containers/overview/transactions";
import ErrorPage from "./error-page";
import "./index.css";
import Root from "./routes/root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "overview",
        element: <Overview />,
        index: true,
      },
      {
        path: "transactions",
        element: <Transactions />,
      },
      {
        path: "administration",
        element: <Administration />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);