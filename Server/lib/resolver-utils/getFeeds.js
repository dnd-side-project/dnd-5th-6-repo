const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET_KEY

function tokenDecode(token){
    const decode = jwt.verify(token, SECRET_KEY);
    if (!decode) {
        return null;
    }
    return decode;
}

const getAllLatestPost = async (token, context) => {
    // const decode = tokenDecode(token);

    // if (decode === null) {
    //     throw new Error('Invalid_Token')
    // }
    const allLatestPost = await context.prisma.post.findMany({
        orderBy:[{uploadDate: 'desc'}],
        where: {feedOpen: 1}
    });
    for (const node of allLatestPost) {
        const userIndex = node.userIndex;
        const postIndex = node.postIndex;
        
        const nickname = await context.prisma.user.findUnique({
            where: {
                userIndex: userIndex
            }
        })

        const cntLikes = await context.prisma.like.count({
            where: {
                postIndex: postIndex
            }
        })

        console.log('닉네임 >>', nickname.userName);
        console.log('좋아요 수 >>', cntLikes);

        node.uploadDate = JSON.stringify(node.uploadDate).slice(6, 11)
    }
    return allLatestPost;
}

module.exports = {
    getAllLatestPost
};