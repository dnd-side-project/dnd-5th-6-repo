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
    const decode = tokenDecode(token);
    if (decode === null) {
        throw new Error('Invalid_Token')
    }
    const allLatestPost = await context.prisma.post.findMany({orderBy:[{uploadDate: 'desc'}]});
    for (const node of allLatestPost) {
        node.uploadDate = node.uploadDate.toString();
    }
    return allLatestPost;
}

module.exports = {
    getAllLatestPost
};