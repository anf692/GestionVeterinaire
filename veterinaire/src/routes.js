import React from "react";
import { createBrowserRouter, Outlet } from "react-router-dom";

// Pages
import Login from "./pages/Login";
import Home from "./pages/Home";
import Owners from "./pages/Owners";
import Patients from "./pages/Patients";
import OwnerFormPage from "./pages/OwnerFormPage";
import OwnerDetailPage from "./pages/OwnerDetailPage";
import PatientFormPage from "./pages/PatientFormPage";
import PatientDetailPage from "./pages/PatientDetailPage";

// Layout & context
import Layout from "./components/layout/Layout";
import { AuthProvider } from "./contexts/AuthContext";
import { AlertProvider } from "./contexts/AlertContext";
import PrivateRoute from "./PrivateRoute";

const Root = () => (
  <AuthProvider>
    <AlertProvider>
      <Outlet />
    </AlertProvider>
  </AuthProvider>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        element: <PrivateRoute />,
        children: [
          {
            element: <Layout />,
            children: [
              {
                index: true,
                element: <Home />,
              },
              {
                path: "owners",
                children: [
                  { index: true, element: <Owners /> },
                  { path: "new", element: <OwnerFormPage /> },
                  { path: ":id/edit", element: <OwnerFormPage /> },
                  { path: ":id", element: <OwnerDetailPage /> },
                ],
              },
              {
                path: "patients",
                children: [
                  { index: true, element: <Patients /> },
                  { path: "new", element: <PatientFormPage /> },
                  { path: ":id/edit", element: <PatientFormPage /> },
                  { path: ":id", element: <PatientDetailPage /> },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
