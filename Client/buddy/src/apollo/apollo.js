import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloLink,
} from "@apollo/client";

const httpLink = new HttpLink({ uri: "http://localhost:3000/graphql" });

const authLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem("jwtToken");
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : "",
    },
  });
  return forward(operation);
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
