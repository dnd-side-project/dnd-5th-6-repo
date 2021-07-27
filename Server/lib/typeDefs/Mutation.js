const {gql} = require('apollo-server');

const typeDefs = gql`
    type Mutation {
        naverLogin (
            accessToken: String!
        ): String!
        kakaoLogin (
            accessToken: String!
        ): String!
    }
`

module.exports = typeDefs;