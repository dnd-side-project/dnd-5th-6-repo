const {naverUserInfo, naverDuplicateCheck, kakaoValidCheck} = require('../resolver-utils/SocialLogin');
const {createJwtToken}= require('../resolver-utils/UserAuth')
const resolvers = {
    Query: {

    },
    Mutation: {
        naverLogin: async (parent, args, context) => {
            const response = await naverUserInfo(args.accessToken);
            if (response.status === 200) {
                const isDuplicated = await naverDuplicateCheck(context, response.userId);
                const token = createJwtToken(isDuplicated.userIndex);
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
    }
}

module.exports = {
    resolvers: resolvers
}
