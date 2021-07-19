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
                    kakaoID: "null"
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

const kakaoValidCheck = async (context, accessToken) => {
    const response = await fetch('https://kapi.kakao.com/v1/user/access_token_info', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })

    const result = await response.text();

    if (JSON.parse(result).msg) {
        return {status: 400, error: JSON.parse(result).msg}
    }
    else {
        const userInfo = await kakaoUserInfo(context, accessToken);

        return {
            status: 200,
            userIndex: userInfo.userIndex,
            newUser: userInfo.newUser
        }
    }
}

const kakaoUserInfo = async (context, accessToken) => {
    const response = await fetch('https://kapi.kakao.com/v2/user/me', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })

    const result = await response.text();

    return await kakaoDuplicateCheck(context, JSON.parse(result).id);
}

const kakaoDuplicateCheck = async (context, id) => {
    try {

        const result = await context.prisma.user.findMany();
        const targetUserNode = result.filter(node => node.kakaoID === String(id));

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
                    naverID: "null",
                    kakaoID: String(id)
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
    naverDuplicateCheck,
    kakaoValidCheck,
    kakaoUserInfo,
    kakaoDuplicateCheck
}