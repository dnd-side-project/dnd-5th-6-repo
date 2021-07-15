const fetch = require('node-fetch');

const validation = async (accessToken) => {
    const response = await fetch('https://openapi.naver.com/vi/nid/me', {
        method: 'GET',
        headers: {
            'Authorization' : `Bearer ${accessToken}`
        }
    })
    console.info(response);
}

module.exports = {
    validation
}