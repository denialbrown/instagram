const Service = require("../helper/index");
const send = Service.sendResponse;
const { HttpStatus, ErrorCode } = require("../helper/enum")
const { Message } = require("../helper/localization");
const postSchema = require("../models/post");
const commentSchema = require("../models/comment");
var mongoose = require('mongoose');
const comment = require("../models/comment");

module.exports = {
    /**
     * This function is use for add comment 
     * @param {} req.params.postId
     * @body {} req.body.comment
     * @body {} res
     * @returns
     */
    addComment: async function (req, res) {
        try {
            if (Service.hasValidatorErrors(req, res)) {
                return;
            }
            var post = await postSchema.findOne({ _id: req.params.postId, isDeleted: false })
            if (!post) {
                return send(res, HttpStatus.UNAUTHORIZED_CODE, ErrorCode.NO_RECORDED_FOUND, Message.POST_NOT_FOUND, null)
            }
            var newComment = new commentSchema
            newComment.userId = req.authUser._id
            newComment.postId = req.params.postId
            newComment.comment = req.body.comment
            var save = newComment.save()
            if (!save) {
                return send(res, HttpStatus.BAD_REQUEST_STATUS_CODE, ErrorCode.REQUIRED_CODE, Message.DATA_NOT_SAVE, null)
            }
            return send(res, HttpStatus.SUCCESS_CODE, HttpStatus.SUCCESS_CODE, Message.COMMENT_ADD_SUCESS, {
                id: newComment.id
            });
        } catch (error) {
            console.log('signupUser', error);
            return send(res, HttpStatus.INTERNAL_SERVER_CODE, HttpStatus.INTERNAL_SERVER_CODE, Message.SOMETHING_WENT_WRONG, null);
        }
    },
    /**
     * This function is use for list comment 
     * @param {} req.params.postId
     * @body {} res
     * @returns
     */
    listComment: async function (req, res) {
        try {
            if (Service.hasValidatorErrors(req, res)) {
                return;
            }
            var post = await postSchema.findOne({ _id: req.params.postId, isDeleted: false })
            if (!post) {
                return send(res, HttpStatus.UNAUTHORIZED_CODE, ErrorCode.NO_RECORDED_FOUND, Message.POST_NOT_FOUND, null)
            }
            var filter = {
                _id: new mongoose.Types.ObjectId(req.params.postId),
                isDeleted: false
            }
            var comment = await postSchema.aggregate([
                {
                    $match: filter
                },
                {
                    $lookup: {
                        from: "comments",
                        localField: "_id",
                        foreignField: "postId",
                        as: "comment",
                    },
                },{
                    $lookup: {
                        from: "comments",
                        let: { id: "$_id" },
                        pipeline: [{
                            $match:
                            {
                                $expr:
                                {
                                    $and: [{ $eq: ["$postId", "$$id"] },]
                                }
                            }
                        },{
                            $project: {
                                _id: 0,
                                comment:1
                            }
                        }
                        ],
                        as: "coomments",
                    },
                },
                {
                    $project: {
                        id: 1,
                        file: {
                            $concat: [process.env.BASEURL, '$file']
                        },
                        coomments:1,
                    }
                }
            ])
            return send(res, HttpStatus.SUCCESS_CODE, HttpStatus.SUCCESS_CODE, Message.COMMENT_LIST_SUCESS, comment);
        } catch (error) {
            console.log('signupUser', error);
            return send(res, HttpStatus.INTERNAL_SERVER_CODE, HttpStatus.INTERNAL_SERVER_CODE, Message.SOMETHING_WENT_WRONG, null);
        }
    },
    /**
     * This function is use for delete comment 
     * @param {} req.params.commentId
     * @body {} res
     * @returns
     */
     deleteComment: async function (req, res) {
        try {
            if (Service.hasValidatorErrors(req, res)) {
                return;
            }
            console.log(req.params.commentId);
            var comment = await commentSchema.findByIdAndDelete({ _id: req.params.commentId, isDeleted: false })
            if (!comment) {
                return send(res, HttpStatus.UNAUTHORIZED_CODE, ErrorCode.NO_RECORDED_FOUND, Message.COMMENT_NOT_FOUND, null)
            }
            return send(res, HttpStatus.SUCCESS_CODE, HttpStatus.SUCCESS_CODE, Message.COMMENT_DELETE, null);
        } catch (error) {
            console.log('signupUser', error);
            return send(res, HttpStatus.INTERNAL_SERVER_CODE, HttpStatus.INTERNAL_SERVER_CODE, Message.SOMETHING_WENT_WRONG, null);
        }
    },
}