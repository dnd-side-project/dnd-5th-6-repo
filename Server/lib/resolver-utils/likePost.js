const {jwtDecode} = require('../resolver-utils/UserAuth');

const updatePostByLike = async (token, args, context) => {
    let userIndex = -1;
    const {postIndex} = args;
    const decode = jwtDecode(token.split(' ')[1])
    if (decode === null) {
        throw new Error('Invalid_Token')
    } else {
        userIndex = decode.ID;
    }
    try {
        await context.prisma.like.create({
            data: {
                userIndex: userIndex,
                postIndex: postIndex
            }
        })
    } catch(err) {
        throw new Error('좋아요 누르기 실패!');
    }
    return true;
}

module.exports = {
    updatePostByLike
}