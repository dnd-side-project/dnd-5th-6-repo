import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { IS_LOGGED_IN } from "./../apollo/queries/login/login";

function PublicRoute({ component: Component, restricted, ...rest }) {
  const { data: IsLoggedIn } = useQuery(IS_LOGGED_IN);
  return (
    <Route>
      {...rest}
      render=
      {(props) =>
        IsLoggedIn && restricted ? (
          <Redirect to="/login" />
        ) : (
          <Component {...props} />
        )
      }
    </Route>
  );
}

export default PublicRoute;
