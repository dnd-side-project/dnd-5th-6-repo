const fetch = require('node-fetch');

const naverUserInfo = async (accessToken) => {
    const response = await fetch('https://openapi.naver.com/v1/nid/me', {
        method: 'GET',
        headers: {
            'Authorization' : `Bearer ${accessToken}`
        }
    })

    const result = await response.text();
    console.log("유저 정보:", result);
    if (response.status === 200) {
        return [response.status, JSON.parse(result).response.id];
    }
    else {
        return [response.status, JSON.parse(result).message];
    }
}

// TODO: Nickname return 값은 닉네임 생성 방법 정의하여 사용해야 함
const naverDuplicateCheck = async (context, id, nickname) => {
    try {
        const result = await context.prisma.user.findMany();
        const targetUserNode = result.filter(node => node.naverID === id);
        if (targetUserNode.length > 0) {
            makeUserNickname(1);
            return {
                nickname: result[result.length - 1].userName,
                userIndex: targetUserNode.userIndex
            }
        } else {
            await context.prisma.user.create({
                data: {
                    userName: makeUserNickname(context),
                    naverID: id,
                    googleID: "null"
                }
            })
            const currUserIndex = await context.prisma.user.findMany();
            return {
                nickname: currUserIndex[currUserIndex.length - 1].userName,
                userIndex: currUserIndex[currUserIndex.length - 1].userIndex
            }
        }
    } catch (err) {
        throw err;
    }
}

const makeUserNickname = async (context) => {
    console.log('A'.charCodeAt(0));
    const count = await context.prisma.user.count();
    console.log("COUNT: ", count);
    return context;
}



module.exports = {
    naverUserInfo,
    naverDuplicateCheck
}