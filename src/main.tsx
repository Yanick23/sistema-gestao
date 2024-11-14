import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import Login from "./Paginas/Login";
import ErrorPage from "./error-page";


import Projecto  from "./Paginas/Projectos/FormProjecto";

import Contrato from "./Paginas/Contrato";
import MaisScreen from "./Paginas/MainScreen";
import Parceiro from "./Paginas/Parceiro/FormProjecto";
import PrivateRoute from "./componentes/PrivateRoutProps";
import { AuthProvider } from "./context/AuthContextTYpe";

const router = createBrowserRouter([{
  path: "/",
  element: <Login />,
  errorElement: <ErrorPage />,
},

{
  path: "/admin",
  element: (
    <PrivateRoute allowedRoles={["ROLE_MANAGER", "ROLE_ADMIN"]}>
      <MaisScreen />
    </PrivateRoute>
  ),
  errorElement: <ErrorPage />,
  children:[
    { index: true, loader: async () => redirect("/admin/parceiros") },
   
    {
      path: "/admin/parceiros",
      element: (
        <PrivateRoute allowedRoles={["ROLE_MANAGER", "ROLE_ADMIN"]}>
          <Parceiro />
        </PrivateRoute>
      ),
      errorElement: <ErrorPage />,
    },
    {
      path: "/admin/projectos",
      element: (
        <PrivateRoute allowedRoles={["ROLE_ADMIN","ROLE_MANAGER"]}>
          <Projecto />
        </PrivateRoute>
      ),
      errorElement: <ErrorPage />,
    },
    {
      path: "/admin/contratos",
      element: (
        <PrivateRoute allowedRoles={["ROLE_ADMIN"]}>
          <Contrato />
        </PrivateRoute>
      ),
      errorElement: <ErrorPage />,
    }
  ]
},
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);