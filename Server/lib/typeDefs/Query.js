const {gql} = require('apollo-server');

const typeDefs = gql`
    type Query{
        testQuery(
            test: String!
        ): String!
        testRead(
            test: String!
        ): String!
    }    
`

module.exports = typeDefs;