const {gql} = require('apollo-server');

const typeDefs = gql`
    type Mutation {
        getAllLatestPost: PostData!
    }
`

module.exports = typeDefs;