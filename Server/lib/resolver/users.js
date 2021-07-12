const resolvers = {
    Query: {
        testQuery: (parent, args) => {
            return args.test + "Test Query!";
        }
    },
    Mutation: {
        testMutation: async (parent, args, context) => {
            const {prisma} = context;
            const user = await prisma.user.create({
                data: {
                    userName: 'qwekrqw',
                    naverID: 'thd123123',
                    googleID:'thdthd'
                }
            })
            return args.test_ + "Test Mutation!";
        }
    }
}

module.exports = {
    resolvers: resolvers
}