const {ApolloServer} = require('apollo-server-express');
const queries = require('./lib/typeDefs/Query');
const mutations = require('./lib/typeDefs/Mutation');
const users = require('./lib/resolver/users');
const schema = require('./lib/schema/_schema');

const typeDefs = [
    queries,
    mutations,
    schema.typeDefs
]

const resolvers = [
    users.resolvers,
]

const apollo = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req}) => {
        return {
            req
        }
    }
})

module.exports = {apollo}