const jwt = require('jsonwebtoken');

const userAuth = (id) => {
    return jwt.sign({ID:id}, "뭘로하죠?ㅋㅋ");
}

module.exports = {
    createJwtToken: userAuth
}