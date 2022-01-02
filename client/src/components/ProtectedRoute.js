import React from "react";
import { Redirect, Route } from "react-router-dom";

function ProtectedRoute({ component: Component, ...restOfProps }) {
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  return (
    <Route
      {...restOfProps}
      render={(props) => {
        if (!isAuthenticated) return <Redirect to="/uphone" />;
        else return <Component {...props} />;
      }}
    />
  );
}

export default ProtectedRoute;
