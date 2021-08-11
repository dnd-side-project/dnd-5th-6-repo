const {gql} = require('apollo-server');

const typeDefs = gql`
    type User{
        userIndex: Int!
        userName: String!
#        naverID: String
#        kakaoID: String
    }
    
    type Post {
        postIndex: Int!
        userIndex: Int!
        uploadDate: String!
        exercise: Int!
        content: String!
        condition: Int!
        feedOpen: Int!
    }
    
    type Like {
        likeIndex: Int!
        userIndex: Int
        postIndex: Int
        totalLike: Int!
        isLiked: Boolean!
    }
    
    type PostData {
        PostData: [PostInfomation]!
        likeArray: [Int!]
    }
    
    type PostInfomation {
        Post: Post!
        User: User!
        Like: Int!
    }
    
    type LikedPost {
        postIndex: Int!
    }

    type Exercise {
        Index: Int!
        Name: String!
    }
    
`

module.exports = {typeDefs: typeDefs};