const { getAllFeeds } = require('../resolver-utils/getFeeds');

const resolvers = {
    Query: {
        readFeed: (parent, args, context) => {
            getAllFeeds(context.req.headers['authorization'].split(' ')[1], context);
            return "TEST Read Feed";
        }
    }
}

module.exports = {
    resolvers: resolvers
}