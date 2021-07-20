const jwt = require('jsonwebtoken');

const jwtGenerator = (id) => {
    return jwt.sign({ID:id}, process.env.JWT_SECRET_KEY);
}

module.exports = {
    createJwtToken: jwtGenerator
}