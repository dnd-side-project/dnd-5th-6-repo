const {gql} = require('apollo-server');

const typeDefs = gql`
    type User{
        ID: String!
        PW: String!
        nickname: String!
        salt: String!
    }
    
    type Post{
        postIndex: Int!
        userIndex: Int!
        uploadDate: String!
        exercise: String!
        content: String!
        condition: Int!
        feedOpen: Int!
        cardImgIndex: Int
    }
    
    type Like {
        likeIndex: Int!
        userIndex: Int!
        postIndex: Int!
    }
`

module.exports = {typeDefs: typeDefs};