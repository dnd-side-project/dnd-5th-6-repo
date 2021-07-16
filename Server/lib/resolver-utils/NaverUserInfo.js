const fetch = require('node-fetch');

const naverUserInfo = async (accessToken) => {
    const response = await fetch('https://openapi.naver.com/v1/nid/me', {
        method: 'GET',
        headers: {
            'Authorization' : `Bearer ${accessToken}`
        }
    })

    const result = await response.text();
    console.log(result);
    if (response.status === 200) {
        return [response.status, JSON.parse(result).response.id];
    }
    else {
        return [response.status, JSON.parse(result).message];
    }
}

// TODO: Nickname return 값은 닉네임 생성 방법 정의하여 사용해야 함
const naverDuplicateCheck = async (context, id) => {
    try {
        const result = await context.prisma.user.findMany();
        if (result.filter(node => node.naverID === id).length > 0) {
            // Logic
        } else {
            await context.prisma.user.create({
                data: {
                    userName: "TEST ID",
                    naverID: id,
                    googleID: "null"
                }
            })
            const currUserIndex = await context.prisma.user.findMany();
            return {
                nickname: "TEST ID",
                userIndex: currUserIndex[currUserIndex.length - 1].userIndex
            }
        }
    } catch (err) {
        throw err;
    }

}

module.exports = {
    naverUserInfo,
    naverDuplicateCheck
}