export const defaults = {
  isLoggedIn: !!localStorage.getItem("Token"),
};

export const resolvers = {
  Mutation: {
    logUserIn: (_, { Token }, { cache }) => {
      localStorage.setItem("token", Token);
      cache.writeData({
        data: {
          isLoggedIn: true,
        },
      });
      window.location = "/";
      return null;
    },
    logUserOut: (_, __, { cache }) => {
      localStorage.removeItem("Token");
      window.location = "/";
      return null;
    },
  },
};
