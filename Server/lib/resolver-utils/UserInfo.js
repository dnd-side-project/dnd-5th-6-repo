const {jwtDecode} = require('../resolver-utils/UserAuth');

const getUserNickname = async (token, context) => {
    let userIndex = -1
    if(token !== undefined) {
        const decode = jwtDecode(token.split(' ')[1]);
        if (decode === null) {
            throw new Error('Invalid_Token')
        } else {
            userIndex = decode.ID;
        }
    }

    const userInfo = await context.prisma.user.findUnique({
        where: {userIndex: userIndex}
    })

    return userInfo.userName;
}



module.exports = {
    getUserNickname
}