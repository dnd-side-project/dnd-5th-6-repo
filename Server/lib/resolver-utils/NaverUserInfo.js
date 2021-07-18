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

const naverDuplicateCheck = async (context, id, nickname) => {
    try {
        const result = await context.prisma.user.findMany();
        const targetUserNode = result.filter(node => node.naverID === id);
        if (targetUserNode.length > 0) {
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
    let Alpa = 65;
    // TODO: count 값 기준으로 진행하면 ID가 중복 될 수 있음
    const userNode = await context.prisma.user.count();
    let count = userNode[userNode.length - 1].userIndex;
    while(count > 999){
        count = count % 999
        Alpa++;
    }
    if(count < 10){
        return String.fromCharCode(Alpa).concat('00', String(count+1));
    }else if (count < 100){
        return String.fromCharCode(Alpa).concat('0', String(count+1));
    }else{
        return String.fromCharCode(Alpa).concat(String(count+1));
    }
}

module.exports = {
    naverUserInfo,
    naverDuplicateCheck
}