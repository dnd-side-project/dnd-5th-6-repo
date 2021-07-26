const jwt = require('jsonwebtoken');
require("dotenv").config();
const SECRET_KEY = process.env.JWT_SECRET_KEY
function tokenDecode(token){
    const decode = jwt.verify(token, SECRET_KEY);
    if (!decode) {
        return null;
    }
    return decode;
}
const getAllLatestPost = async (token, context) => {
    let decode = '';
    let userIndex = -1
    let returnLike = [];
    let orderByFlag;

    if(token !== undefined) {
        decode = tokenDecode(token.split(' ')[1]);
        if (decode === null) {
            throw new Error('Invalid_Token')
        } else {
            userIndex = decode.ID;
        }
    }
    let returnData = [];
    const allLatestPost = await context.prisma.post.findMany({
        orderBy:[{uploadDate: `${orderByFlag}`}],
        where: {feedOpen: 1}
    });
    for (const node of allLatestPost) {
        returnData.push({
            Post: node,
            User: await context.prisma.user.findUnique({
                where: { userIndex: node.userIndex }
            }),
            Like: await context.prisma.like.count({
                where: { postIndex: node.postIndex }
            })
        });
        node.uploadDate = JSON.stringify(node.uploadDate).slice(6, 11)
    }
    const likeArray = await context.prisma.like.findMany({
        where: {userIndex: userIndex}
    });

    for(const node of likeArray) {
        returnLike.push(node.postIndex);
    }

    return {
        PostData: returnData,
        likeArray: returnLike
    };
}
module.exports = {
    getAllLatestPost
};