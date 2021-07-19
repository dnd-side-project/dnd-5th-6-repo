const {gql} = require('apollo-server');

const typeDefs = gql`
    type Query{
        testQuery (
            test: String!
        ): String!
        naverLogin (
            accessToken: String!
        ): String!
        kakaoLogin (
            accessToken: String!
        ): String!
    }    
`

module.exports = typeDefs;