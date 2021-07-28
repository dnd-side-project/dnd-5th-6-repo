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
const getAllLatestPost = async (token, args, context) => {
    let decode = '';
    let userIndex = -1
    let returnLike = [];
    let orderByFlag = args.flag; // 0 최신순 1 인기순

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
        orderBy:[{uploadDate: `desc`}],
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

    // 인기순 정렬
    if (orderByFlag == 1) {
        returnData.sort((a, b) => {
            return parseFloat(b.Like) - parseFloat(a.Like);
        });
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

const getSpecificExercise = async (token, args, context) => {
    let decode = '';
    let userIndex = -1
    let returnLike = [];
    let orderByFlag = args.flag; // 0 최신순 1 인기순
    let exercise = args.exercise // 0 ~ 11

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
        orderBy:[{uploadDate: `desc`}],
        where: {
            feedOpen: 1,
            exercise: exercise
        }
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

    // 인기순 정렬
    if (orderByFlag == 1) {
        returnData.sort((a, b) => {
            return parseFloat(b.Like) - parseFloat(a.Like);
        });
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
    getAllLatestPost,
    getSpecificExercise
};