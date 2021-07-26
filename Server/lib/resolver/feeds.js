const { getAllLatestPost } = require('../resolver-utils/getFeeds');

const resolvers = {
    Query: {

    },
    Mutation: {
        getAllLatestPost: (parent, args, context) => {
            return getAllLatestPost(context.req.headers['authorization'], context);
        },
    }
}

module.exports = {
    resolvers: resolvers
}