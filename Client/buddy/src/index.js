import React from "react";
import ReactDOM from "react-dom";
import "./index.module.css";
import App from "./app";
import { ApolloProvider } from "@apollo/client/react";
import client from "./apollo/apollo";

ReactDOM.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ApolloProvider>,
  document.getElementById("root")
);
console.log(client.link);
