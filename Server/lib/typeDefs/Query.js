const {gql} = require('apollo-server');

const typeDefs = gql`
    type Query{
        getAllLatestPost(
            flag: Int!
        ): PostData!
        getSpecificExercise(
            flag: Int!
            exercise: Int!
        ): PostData!
        getMyPost: PostData!
        reporting: Int!
        getExercise: [Exercise!]
    }
`

module.exports = typeDefs;