const { getAllLatestPost, getSpecificExercise, getMyPost, getExerciseList, getMyDate } = require('../resolver-utils/getFeeds');
const { updatePostByLike, addNewPost, reporting } = require('../resolver-utils/Post');

const resolvers = {
    Query: {
        getAllLatestPost: (parent, args, context) => {
            return getAllLatestPost(context.req.headers['authorization'], args, context);
        },
        getSpecificExercise: (parent, args, context) => {
            return getSpecificExercise(context.req.headers['authorization'], args, context);
        },
        getMyPost: (parent, args, context) => {
            return getMyPost(context.req.headers['authorization'], args, context);
        },
        reporting: (parent, args, context) => {
            return reporting(context.req.headers['authorization'], context);
        },
        getExercise: (parent, args, context) => {
            return getExerciseList(context);
        },
        getMyDate: (parent, args, context) => {
            return getMyDate(context.req.headers['authorization'], args, context);
        }
    },
    Mutation: {
        likePost: (parent, args, context) => {
            return updatePostByLike(context.req.headers['authorization'], args, context);
        },
        addPost: (parent, args, context) => {
            return addNewPost(context.req.headers['authorization'], args, context);
        }
    }
}

module.exports = {
    resolvers: resolvers
}