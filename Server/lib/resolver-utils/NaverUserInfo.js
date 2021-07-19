const fetch = require('node-fetch');

const naverUserInfo = async (accessToken) => {
    const response = await fetch('https://openapi.naver.com/v1/nid/me', {
        method: 'GET',
        headers: {
            'Authorization' : `Bearer ${accessToken}`
        }
    })

    const result = await response.text();
    
    if (response.status === 200) {
        return {status: response.status, userId: JSON.parse(result).response.id};
    }
    else {
        return {status: response.status, error: JSON.parse(result).message};
    }
}

const naverDuplicateCheck = async (context, id, nickname) => {
    try {
        const result = await context.prisma.user.findMany();
        const targetUserNode = result.filter(node => node.naverID === id);
        if (targetUserNode.length > 0) {
            return {
                nickname: result[result.length - 1].userName,
                userIndex: targetUserNode[0].userIndex,
                newUser: false
            }
        } else {
            await context.prisma.user.create({
                data: {
                    userName: "dummy",
                    naverID: id,
                    googleID: "null"
                }
            })
            const currUserIndex = await makeUserNickname(context);
            return {
                nickname: currUserIndex.nickName,
                userIndex: currUserIndex.userIndex,
                newUser: true
            }
        }
    } catch (err) {
        throw err;
    }
}

const makeUserNickname = async (context) => {
    let alpa = 65;
    let nick;
    const userNode = await context.prisma.user.findMany();
    let lastUser = userNode[userNode.length - 1];
    let tempUserIndex = lastUser.userIndex;
    while(tempUserIndex > 999) {
        tempUserIndex = tempUserIndex % 999
        alpa++;
    }

    if(tempUserIndex < 10){
        nick = String.fromCharCode(alpa).concat('00', String(tempUserIndex));
    }else if (tempUserIndex < 100){
        nick = String.fromCharCode(alpa).concat('0', String(tempUserIndex));
    }else{
        nick = String.fromCharCode(alpa).concat(String(tempUserIndex));
    }

    await context.prisma.user.update({
        where: {
            userIndex: lastUser.userIndex
        },data: {
            userName: nick
        }
    })
    return {userIndex: lastUser.userIndex, nickName: nick};
}

module.exports = {
    naverUserInfo,
    naverDuplicateCheck
}