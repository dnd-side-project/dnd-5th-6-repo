export const defaults = {
  isLoggedIn: localStorage.getItem("Token") !== null ? true : false,
};

export const resolvers = {
  Mutation: {},
};
