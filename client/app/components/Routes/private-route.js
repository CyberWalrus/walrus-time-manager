import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({
  component: Component,
  isAuthenticated,
  isRole = true,
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated && isRole ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: `/login`, state: { from: props.location } }}
        />
      )
    }
  />
);

export default PrivateRoute;
