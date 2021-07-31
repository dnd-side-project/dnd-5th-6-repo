const {jwtDecode} = require('../resolver-utils/UserAuth');

const updatePostByLike = async (token, args, context) => {
    let userIndex = -1;
    const {postIndex, isDuplicate} = args;
    const decode = jwtDecode(token.split(' ')[1])
    if (decode === null) {
        throw new Error('Invalid_Token')
    } else {
        userIndex = decode.ID;
    }

    if (isDuplicate === true) {
        await context.prisma.like.delete({
            where: {
                postIndex: postIndex
            }
        })
    } else {
        await context.prisma.like.create({
            data: {
                userIndex: userIndex,
                postIndex: postIndex
            }
        })

    }
    return true;
}

module.exports = {
    updatePostByLike
}