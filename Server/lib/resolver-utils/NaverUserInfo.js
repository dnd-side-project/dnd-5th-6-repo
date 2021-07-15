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
        return [response.status, JSON.parse(result).response.id];
    }
    else {
        return [response.status, JSON.parse(result).message];
    }
    
    //const data = [response.status, JSON.parse(result).response.id];
    //console.log(JSON.parse(result));

    //return data;
}

const naverDuplicateCheck = async (id) => {
    console.log('id >>', id);
}

module.exports = {
    naverUserInfo,
    naverDuplicateCheck
}