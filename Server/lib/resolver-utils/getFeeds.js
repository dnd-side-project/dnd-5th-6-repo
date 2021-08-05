const {jwtDecode} = require('../resolver-utils/UserAuth');

const getAllLatestPost = async (token, args, context) => {
    let userIndex = -1
    let orderByFlag = args.flag; // 0 최신순 1 인기순

    if(token !== undefined) {
        const decode = jwtDecode(token.split(' ')[1]);
        if (decode === null) {
            throw new Error('Invalid_Token')
        } else {
            userIndex = decode.ID;
        }
    }

    const allLatestPost = await context.prisma.post.findMany({
        orderBy: [{uploadDate: `desc`}],
        where: {feedOpen: 1}
    });

    let returnData = await parseReturnData(context, allLatestPost);
    if (orderByFlag === 1) returnData = sortByPopularity(returnData);
    const returnLike = await getLikeCount(context, userIndex);

    return {
        PostData: returnData,
        likeArray: returnLike
    };
}

const getSpecificExercise = async (token, args, context) => {
    let userIndex = -1
    const orderByFlag = args.flag; // 0 최신순 1 인기순
    const exercise = args.exercise // 0 ~ 11

    if(token !== undefined) {
        const decode = jwtDecode(token.split(' ')[1]);
        if (decode === null) {
            throw new Error('Invalid_Token')
        } else {
            userIndex = decode.ID;
        }
    }

    const allLatestPost = await context.prisma.post.findMany({
        orderBy: [{uploadDate: `desc`}],
        where: {
            feedOpen: 1,
            exercise: exercise
        }
    });

    let returnData = await parseReturnData(context, allLatestPost);
    if (orderByFlag === 1) returnData = sortByPopularity(returnData);
    const returnLike = await getLikeCount(context, userIndex);

    return {
        PostData: returnData,
        likeArray: returnLike
    };
}

const getMyPost = async (token, args, context) => {
    let userIndex = -1
    
    if (token !== undefined) {
        const decode = jwtDecode(token.split(' ')[1]);
        if (decode === null) {
            throw new Error('Invalid_Token')
        } else {
            userIndex = decode.ID;
        }
    }

    const allMyPost = await context.prisma.post.findMany({
        orderBy: [{uploadDate: `desc`}],
        where: {userIndex: userIndex}
    });

    let returnData = await parseReturnData(context, allMyPost);
    
    return {
        PostData: returnData
    };
}

const getExerciseList = async (context) => {
    const data = await context.prisma.exercise.findMany();
    return data.map(node => {
        return {
            Index: node.exerciseIndex,
            Name: node.name
        }
    })
}

function sortByPopularity(data) {
    return data.sort((a, b) => {
        return parseFloat(b.Like) - parseFloat(a.Like);
    });
}

async function parseReturnData(context, data) {
    let returnData = [];
    for (const node of data) {
        returnData.push({
            Post: node,
            User: await context.prisma.user.findUnique({
                where: {userIndex: node.userIndex}
            }),
            Like: await context.prisma.like.count({
                where: {postIndex: node.postIndex}
            })
        });
        node.uploadDate = JSON.stringify(node.uploadDate).slice(6, 11)
    }
    return returnData;
}

async function getLikeCount(context, userIndex) {
    let returnLike = [];
    const likeArray = await context.prisma.like.findMany({
        where: {userIndex: userIndex}
    });

    for (const node of likeArray) {
        returnLike.push(node.postIndex);
    }
    return returnLike
}

module.exports = {
    getAllLatestPost,
    getSpecificExercise,
    getMyPost,
    getExerciseList
};