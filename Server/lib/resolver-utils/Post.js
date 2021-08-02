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

const addNewPost = async (token, args, context) => {
    let userIndex = -1;
    const decode = jwtDecode(token.split(' ')[1])
    if (decode === null) {
        throw new Error('Invalid_Token')
    } else {
        userIndex = decode.ID;
    }

    try {
        const addData = await context.prisma.post.create({
            data: {
                userIndex: userIndex,
                uploadDate: new Date(args.uploadDate),
                exercise: args.exercise,
                content: args.content,
                condition: args.condition,
                feedOpen: args.feedOpen,
                cardImgIndex: 1
            },
        })

        /*
        cardImgIndex는 우선 1로 지정했습니다.
        카드 이미지 지정 로직 작성 후 수정해야 합니다.
        */

        return true
    } catch (err) {
        throw err;
    }
}

module.exports = {
    updatePostByLike,
    addNewPost
}