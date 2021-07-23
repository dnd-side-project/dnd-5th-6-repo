const express = require('express')
const app = express()
const apolloInstance = require('./apollo-instance');
const cookieParser = require('cookie-parser');
const port = 3000
require('dotenv').config();

app.use(cookieParser());

apolloInstance.apollo.applyMiddleware({
    app,
    cors: {
        origin: 'http://localhost:8080',
        credentials: true
    }
})

const connect = app.listen(port, () => {
    console.log("Apollo Server start.");
})

const disconnect = () => {
    connect.close();
}

module.exports = {app, disconnect}