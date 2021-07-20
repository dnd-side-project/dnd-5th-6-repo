const {ApolloServer} = require('apollo-server-express');
const {PrismaClient} = require('@prisma/client');
const queries = require('./lib/typeDefs/Query');
const mutations = require('./lib/typeDefs/Mutation');
const users = require('./lib/resolver/users');
const feeds = require('./lib/resolver/feeds');
const schema = require('./lib/schema/_schema');
const prisma = new PrismaClient();

const typeDefs = [
    queries,
    mutations,
    schema.typeDefs
]

const resolvers = [
    users.resolvers,
    feeds.resolvers
]

const testServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => {
        const {request: req} = require('express')
        req.headers['authorization'] = `Bearer ${process.env.TEST_TOKEN}`
        return {
            req, prisma
        }
    }
})

const apollo = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req}) => {
        return {
            req, prisma
        }
    }
})

module.exports = {apollo, testServer}