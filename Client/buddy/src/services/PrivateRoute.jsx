import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { IS_LOGGED_IN } from "./../apollo/queries/login/login";

function PrivateRoute({ component: Component, ...rest }) {
  const {
    data: { isLoggedIn },
  } = useQuery(IS_LOGGED_IN);
  console.log({ isLoggedIn });
  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}

export default PrivateRoute;
