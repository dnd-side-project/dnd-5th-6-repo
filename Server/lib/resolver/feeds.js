const { getAllLatestPost } = require('../resolver-utils/getFeeds');

const resolvers = {
    Query: {
        getAllLatestPost: (parent, args, context) => {
            return getAllLatestPost(context);
        },
    }
}

module.exports = {
    resolvers: resolvers
}