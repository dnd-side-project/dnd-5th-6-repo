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

    var decode = '';
    var didLogin = false;
    var userIndex = -1

    if(token !== undefined) {
        decode = tokenDecode(token.split(' ')[1]);
        if (decode === null) {
            throw new Error('Invalid_Token')
        } else {
            didLogin = true;
            userIndex = decode.ID;
        }
    }
    

    let returnData = [];
    const allLatestPost = await context.prisma.post.findMany({
        orderBy:[{uploadDate: 'desc'}],
        where: {feedOpen: 1}
    });
    for (const node of allLatestPost) {

        // 우선 schema에 didLike 등록 안해서 console로 찍는 작업만 했음
        const postIndex = node.postIndex;
        const didLike = await context.prisma.like.count({
            where: {
                postIndex: postIndex,
                userIndex: userIndex
            }
        })
        
        /*
        JWT 토큰 값이 없어서 decode를 진행하지 않은, 즉 로그인을 하지 않은 경우에는
        userIndex가 -1로 지정이 되어서 무조건 좋아요 누른 여부(didLike)가 0으로 나옴.
        */
        console.log(userIndex, '번 유저가', postIndex, '번 카드에 좋아요를 눌렀을까요?! >>', didLike);

        returnData.push({
            Post: node,
            User: await context.prisma.user.findUnique({
                where: { userIndex: node.userIndex }
            }),
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