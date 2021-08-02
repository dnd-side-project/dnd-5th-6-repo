import { InMemoryCache, Reference, makeVar } from "@apollo/client";

export const isLoggedInVar = makeVar(!!localStorage.getItem("Token"));
