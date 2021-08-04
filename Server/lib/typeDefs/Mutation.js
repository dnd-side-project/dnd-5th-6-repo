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
        addPost (
            uploadDate: String!
            exercise: Int!
            content: String!
            condition: Int!
            feedOpen: Int!
        ): Boolean!
    }
`

module.exports = typeDefs;