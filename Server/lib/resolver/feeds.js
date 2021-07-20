const { getAllLatestPost } = require('../resolver-utils/getFeeds');

const resolvers = {
    Query: {
        readFeed: (parent, args, context) => {
            return getAllLatestPost(context.req.headers['authorization'].split(' ')[1], context);
        },
    }
}

module.exports = {
    resolvers: resolvers
}