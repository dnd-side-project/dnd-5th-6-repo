const fetch = require('node-fetch');

const naverUserInfo = async (accessToken) => {
    const response = await fetch('https://openapi.naver.com/v1/nid/me', {
        method: 'GET',
        headers: {
            'Authorization' : `Bearer ${accessToken}`
        }
    })
    console.log(response)
    if(response.status === 200){
        const result = await response.text();
        console.log("너구나?",result);
    }
}

module.exports = {
    naverUserInfo
}