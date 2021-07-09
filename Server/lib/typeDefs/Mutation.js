const {gql} = require('apollo-server');

const typeDefs = gql`
    type Mutation {
        testMutation (
            test_: String!
        ): String!
    }
`

module.exports = typeDefs;