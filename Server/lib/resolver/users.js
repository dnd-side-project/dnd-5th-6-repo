const {naverUserInfo, naverDuplicateCheck, kakaoValidCheck} = require('../resolver-utils/SocialLogin');
const {createJwtToken}= require('../resolver-utils/UserAuth')
const resolvers = {
    Query: {
        testQuery: (parent, args) => {
            return args.test + "Test Query!";
        },

        naverLogin: async (parent, args, context) => {
            const response = await naverUserInfo(args.accessToken);
            if (response.status === 200) {
                const isDuplicated = await naverDuplicateCheck(context, response.userId);
		console.log(isDuplicated);
                const token = createJwtToken(isDuplicated.userIndex);
		console.log(token);
                
                if (isDuplicated.newUser) {
                    return JSON.stringify({
                        isSuccess: true,
                        code: 200,
                        message: "join success",
                        JWT: token
                    })
                }
                else {
                    return JSON.stringify({
                        isSuccess: true,
                        code: 201,
                        message: "login success",
                        JWT: token
                    })
                }

            } else {
                return JSON.stringify({
                    isSuccess: false,
                    code: response.status,
                    message: response.error
                });
            }
        },

        kakaoLogin: async (parent, args, context) => {
            const response = await kakaoValidCheck(context, args.accessToken);
            const token = createJwtToken(response.userIndex);
            if (response.status === 200 || response.status === 201) {
                if (response.newUser) {
                    return JSON.stringify({
                        isSuccess: true,
                        code: response.status,
                        message: "Join Success",
                        JWT: token
                    })
                }
                else {
                    return JSON.stringify({
                        isSuccess: true,
                        code: response.status,
                        message: "Login Success",
                        JWT: token
                    })
                }            
            } else {
                return JSON.stringify({
                    isSuccess: false,
                    code: response.status,
                    message: response.error
                })
            }
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
                    kakaoID:'thdthd'
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
