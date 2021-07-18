const {gql} = require('apollo-server');

const typeDefs = gql`
    type Mutation {
        testMutation (
            test_: String!
        ): String!
        testCreate(
            test_: String!
        ): String!
        testUpdate(
            test_: String!
        ): String!
        testDelete(
            test_: String!
        ): String!
    }
`

module.exports = typeDefs;