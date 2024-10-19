import { createTheme, StyledEngineProvider, ThemeProvider } from "@mui/material";
import { daDK as coreDaDK } from '@mui/material/locale';
import { daDK } from '@mui/x-data-grid/locales';
import { DialogsProvider, NotificationsProvider } from "@toolpad/core";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import App from "./appLayout";
import Administration from "./containers/administration/administration";
import Overview from "./containers/overview/overview";
import PlanTable from "./containers/plans/planTable";
import SheetsViewer from "./containers/sheets/sheetsViewer";
import Transactions from "./containers/transactions/transactions";
import ErrorPage from "./error-page";
import './i18n';
import "./index.css";
import store from "./redux/store";

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
    element: <App />,
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
          <DialogsProvider>
            <NotificationsProvider>
              <RouterProvider router={router} />
            </NotificationsProvider>
          </DialogsProvider>
        </ThemeProvider>
      </StyledEngineProvider>
    </Provider>
  </React.StrictMode>
);