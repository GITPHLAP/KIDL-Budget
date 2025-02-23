import { StyledEngineProvider } from "@mui/material";
import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from 'react-dom/client';
import { Provider } from "react-redux";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import Overview from "./containers/overview/overview";
import ErrorPage from "./error-page";
import './i18n';
import "./index.css";
import store from "./redux/store";
import { App } from "./appLayout";

// Lazy load pages
const Transactions = lazy(() => import('./containers/transactions/transactions'));
const PlanTable = lazy(() => import('./containers/plans/planTable'));
const SheetsViewer = lazy(() => import('./containers/sheets/sheetsViewer'));
const Administration = lazy(() => import('./containers/administration/administration'));


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Navigate to="/overview" /> },
      {
        path: "overview",
        element: <Overview />,
      },
      {
        path: "transactions",
        element: <Suspense fallback={<div>Loading...</div>}><Transactions /></Suspense>,
      },
      {
        path: "administration",
        element: <Suspense fallback={<div>Loading...</div>}><Administration /></Suspense>,
      },
      {
        path: "plans",
        element: <Suspense fallback={<div>Loading...</div>}><PlanTable /></Suspense>,
      },
      {
        path: "sheets",
        element: <Suspense fallback={<div>Loading...</div>}> <SheetsViewer /> </Suspense>,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <StyledEngineProvider injectFirst={true}>
        <RouterProvider router={router} />
      </StyledEngineProvider>
    </Provider>
  </StrictMode>
);