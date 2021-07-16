const {naverUserInfo, naverDuplicateCheck} = require('../resolver-utils/NaverUserInfo');

const resolvers = {
    Query: {
        testQuery: (parent, args) => {
            return args.test + "Test Query!";
        },
        naverLogin: async (parent, args, context) => {
            const response = await naverUserInfo(args.accessToken);
            if(response[0] === 200) {
                const isDuplicated = await naverDuplicateCheck(context, response[1]);
                console.log("뭔데?:", isDuplicated);
                // 이미 가입한 유저인지, 새로 로그인 하는 유저인지 확인
            } else {
                return JSON.stringify({
                    isSuccess: false,
                    code: response[0],
                    message: "Error"
                });
            }
            return args.accessToken;
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