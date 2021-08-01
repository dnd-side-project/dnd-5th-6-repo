const {gql} = require('apollo-server');

const typeDefs = gql`
    type Mutation {
        naverLogin (
            accessToken: String!
        ): String!
        kakaoLogin (
            accessToken: String!
        ): String!
        likePost (
            postIndex: Int!
            isDuplicate: Boolean
        ): Boolean!
    }
`

module.exports = typeDefs;