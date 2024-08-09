import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
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
import ForecastTable from "./containers/forecasts/forecastTable";
import './i18n';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {index: true, element: <Navigate to="/overview" />},
      {
        path: "overview",
        element: <Overview />,
      },
      {
        path: "transactions",
        element: <Transactions />,
      },
      {
        path: "administration",
        element: <Administration />,
      },
      {
        path: "forecasts",
        element: <ForecastTable />,
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