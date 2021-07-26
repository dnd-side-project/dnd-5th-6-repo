const {gql} = require('apollo-server');

const typeDefs = gql`
    type Query{
        naverLogin (
            accessToken: String!
        ): String!
        kakaoLogin (
            accessToken: String!
        ): String!
    }
`

module.exports = typeDefs;