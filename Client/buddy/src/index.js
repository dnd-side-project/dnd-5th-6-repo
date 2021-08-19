import React from "react";
import ReactDOM from "react-dom";
import "./index.module.css";
import App from "./app";
import { ApolloProvider } from "@apollo/client/react";
import client from "./apollo/apollo";

ReactDOM.render(
  <ApolloProvider client={client}>
    <div>
      <style jsx="true" global="true">{`
      body {
        margin: 0px;
        padding: 0px;
      }

    `}</style>
    </div>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
