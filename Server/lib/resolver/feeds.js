const { getAllLatestPost } = require('../resolver-utils/getFeeds');
const { getSpecificExercise } = require('../resolver-utils/getFeeds');

const resolvers = {
    Query: {
        getAllLatestPost: (parent, args, context) => {
            return getAllLatestPost(context.req.headers['authorization'], args, context);
        },
        getSpecificExercise: (parent, args, context) => {
            return getSpecificExercise(context.req.headers['authorization'], args, context);
        },
    },
    Mutation: {

    }
}

module.exports = {
    resolvers: resolvers
}