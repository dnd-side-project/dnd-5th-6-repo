const resolvers = {
    Query: {
        testQuery: (parent, args) => {
            return args.test + "Test Query!";
        }
    },
    Mutation: {
        testMutation: (parent, args) => {
            return args.test_ + "Test Mutation!";
        }
    }
}

module.exports = {
    resolvers: resolvers
}