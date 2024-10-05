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
import PlanTable from "./containers/plans/planTable";
import './i18n';
import { createTheme, StyledEngineProvider, ThemeProvider } from "@mui/material";
import SheetsViewer from "./containers/sheets/sheetsViewer";
import { daDK } from '@mui/x-data-grid/locales';
import { daDK as coreDaDK } from '@mui/material/locale';

const theme = createTheme(
  {
    palette: {
      primary: { main: '#1976d2' },
    },
  },
  daDK, // x-data-grid translations
  coreDaDK, // core translations
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Navigate to="/overview" /> },
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
        path: "plans",
        element: <PlanTable />,
      },
      {
        path: "sheets",
        element: <SheetsViewer />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <StyledEngineProvider injectFirst={true}>
        <ThemeProvider theme={theme}>
          <RouterProvider router={router} />
        </ThemeProvider>
      </StyledEngineProvider>
    </Provider>
  </React.StrictMode>
);