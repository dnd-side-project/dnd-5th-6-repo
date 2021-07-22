const {gql} = require('apollo-server');

const typeDefs = gql`
    type User{
        userIndex: Int!
        userName: String!
#        naverID: String
#        kakaoID: String
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
    
    type PostData {
        PostData: [PostInfomation]!
    }
    
    type PostInfomation {
        Post: Post!
        User: User!
        Like: Int!
    }
`

module.exports = {typeDefs: typeDefs};