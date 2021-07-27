const {gql} = require('apollo-server');

const typeDefs = gql`
    type Query{
        getAllLatestPost: PostData!
    }
`

module.exports = typeDefs;