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
    if(token !== undefined) {
        const decode = tokenDecode(token.split(' ')[1]);
        if (decode === null) {
            throw new Error('Invalid_Token')
        }
    }

    let returnData = [];
    const allLatestPost = await context.prisma.post.findMany({
        orderBy:[{uploadDate: 'desc'}],
        where: {feedOpen: 1}
    });
    for (const node of allLatestPost) {
        returnData.push({
            Post: node,
            User: await context.prisma.user.findUnique({
                where: { userIndex: node.userIndex }
            }),
            // TODO: 좋아요 여부를 알아야 하니 Like 테이블 자체 값도 필요할 듯 함
            Like: await context.prisma.like.count({
                where: { postIndex: node.postIndex }
            })
        })
        node.uploadDate = JSON.stringify(node.uploadDate).slice(6, 11)
    }

    return {
        PostData: returnData
    };
}

module.exports = {
    getAllLatestPost
};