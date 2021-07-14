
const resolvers = {
    Query: {
        testQuery: (parent, args) => {
            return args.test + "Test Query!";
        },
        testRead: async (parent, args, context) => {
            const {prisma} = context;
            try {
                const user = await prisma.user.findMany()
                console.log(user);
            }catch (err) {
                throw err
            }
            return "Read"
        }
    },
    Mutation: {
        testMutation: async (parent, args, context) => {
            return args.test_ + "Test Mutation!";
        },

        testCreate: async (parent, args, context) => {
            const {prisma} = context;
            const user = await prisma.user.create({
                data: {
                    userName: 'qwekrqw',
                    naverID: 'thd123123',
                    googleID:'thdthd'
                }
            })
            return "Create"
        },

        testUpdate: async (parent, args, context) => {
            const {prisma} = context;
            const user = await prisma.user.update({
                where: {
                    userIndex: 2
                },
                data: {
                    naverID: 'naver12'
                }
            })
            return "Update"
        },

        testDelete: async (parent, args, context) => {
            const {prisma} = context;
            const user = await prisma.user.delete({
                where: {
                    userIndex: 2
                }
            })
            return "Delete"
        }

    }
}

module.exports = {
    resolvers: resolvers
}