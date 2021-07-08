const {gql} = require('apollo-server');

const typeDefs = gql`
    type User{
        ID: String!
        PW: String!
        nickname: String!
        salt: String!
    }
`

module.exports = {typeDefs: typeDefs};