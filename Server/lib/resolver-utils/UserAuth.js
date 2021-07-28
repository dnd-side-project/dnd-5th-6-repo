const jwt = require('jsonwebtoken');
require('dotenv').config();
const SECRET_KEY = process.env.JWT_SECRET_KEY;

const createJwtToken = (id) => {
    return jwt.sign({ID:id}, process.env.JWT_SECRET_KEY);
}

const jwtDecode = (token) => {
    const decode = jwt.verify(token, SECRET_KEY);
    if (!decode) return null;
    return decode;
}


module.exports = {
    createJwtToken,
    jwtDecode
}