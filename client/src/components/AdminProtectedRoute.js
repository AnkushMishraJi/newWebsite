import React from "react";
import { Redirect, Route } from "react-router-dom";

function AdminProtectedRoute({ component: Component, ...restOfProps }) {
  const isAdminAuthenticated = localStorage.getItem("isAdminAuthenticated");

  return (
    <Route
      {...restOfProps}
      render={(props) => {
        if (!isAdminAuthenticated) return <Redirect to="/adminin" />;
        else return <Component {...props} />;
      }}
    />
  );
}

export default AdminProtectedRoute;