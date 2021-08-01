const { getAllLatestPost, getSpecificExercise } = require('../resolver-utils/getFeeds');
const { updatePostByLike } = require('../resolver-utils/likePost');

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
        likePost: (parent, args, context) => {
            return updatePostByLike(context.req.headers['authorization'], args, context);
        }
    }
}

module.exports = {
    resolvers: resolvers
}