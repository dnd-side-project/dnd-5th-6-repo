const { getAllLatestPost } = require('../resolver-utils/getFeeds');

const resolvers = {
    Query: {
        getAllLatestPost: (parent, args, context) => {
            return getAllLatestPost(context.req.headers['authorization'], context);
        },
    },
    Mutation: {

    }
}

module.exports = {
    resolvers: resolvers
}