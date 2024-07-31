import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Administration from "./containers/administration/administration";
import Overview from "./containers/overview/overview";
import Transactions from "./containers/transactions/transactions";
import ErrorPage from "./error-page";
import "./index.css";
import Root from "./routes/root";
import { Provider } from "react-redux";
import store from "./redux/store";

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
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);