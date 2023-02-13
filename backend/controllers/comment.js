const commentService = require('../service/comment-service');

const addComment = async (driverId,passengerId,content) => {
    const comment = await commentService.addComment(driverId,passengerId,content);
    return comment;
}

const getCommentByDriverId = async(driverId) => {
    const commentIds = await commentService.findBy('driver',driverId);
    return commentIds;
}


module.exports = {
    addComment,
    getCommentByDriverId
};

