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
        const likeIndex = await context.prisma.like.findMany({
            where: {
                userIndex: userIndex,
                postIndex: postIndex
            }
        });
        await context.prisma.like.delete({
            where: {
                likeIndex: likeIndex[0].likeIndex
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