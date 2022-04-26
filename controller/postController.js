const Service = require("../helper/index");
const postSchema = require("../models/post");
const reactionSchema = require("../models/rection");
const send = Service.sendResponse;
const { HttpStatus, ErrorCode } = require("../helper/enum")
const { Message } = require("../helper/localization");
const fs = require('fs');
const mongoose = require('mongoose')

module.exports = {
    /**
     * This function is use for add post 
     * @body {} req.files.file
     * @body {} req.body.caption
     * @body {} res
     * @returns
     */
    addPost: async function (req, res) {
        try {
            if (!req.files) {
                return send(res, HttpStatus.BAD_REQUEST_STATUS_CODE, ErrorCode.REQUIRED_CODE, Message.FILE_IS_REQUIRED, null)
            }
            var file = req.files.file
            var fileName = Service.getCurrentTimeStampUnix() + req.files.file.name
            const folderName = req.authUser.id
            if (!fs.existsSync('./uploads/' + folderName)) {
                fs.mkdir('./uploads/' + folderName, (err) => {
                    if (err) {
                        console.log(err);
                    }
                })
            }
            file.mv('./uploads/' + folderName + '/' + fileName)
            var newPost = new postSchema
            newPost.file = '/uploads/' + folderName + '/' + fileName
            newPost.caption = req.body.caption
            newPost.userId = req.authUser._id
            var save = await newPost.save()
            if (!save) {
                return send(res, HttpStatus.BAD_REQUEST_STATUS_CODE, ErrorCode.REQUIRED_CODE, Message.DATA_NOT_SAVE, null)
            }
            return send(res, HttpStatus.SUCCESS_CODE, HttpStatus.SUCCESS_CODE, Message.POST_ADD_SUCESS, {
                id: newPost.id
            });
        } catch (error) {
            console.log('signupUser', error);
            return send(res, HttpStatus.INTERNAL_SERVER_CODE, HttpStatus.INTERNAL_SERVER_CODE, Message.SOMETHING_WENT_WRONG, null);
        }
    },
    /**
     * This function is use for delete post 
     * @param {} req.params.postId
     * @body {} res
     * @returns
     */
    getPost: async function (req, res) {
        try {
            if (Service.hasValidatorErrors(req, res)) {
                return;
            }
            const filter = {
                _id: new mongoose.Types.ObjectId(req.params.postId),
                isDeleted: false
            }
            var reaction = await postSchema.aggregate([
                {
                    $match: filter
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "userId",
                        foreignField: "_id",
                        as: "user",
                    },
                },
                {
                    $lookup: {
                        from: "reactions",
                        let: { id: "$_id" },
                        pipeline: [{
                            $match:
                            {
                                $expr:
                                {
                                    $and: [{ $eq: ["$postId", "$$id"] },]
                                }
                            }
                        },
                        ],
                        as: "reaction",
                    },
                },
                {
                    $project: {
                        _id: 1,
                        file: {
                            $concat: [process.env.BASEURL, '$file']
                        },
                        userName: {
                            $arrayElemAt: ["$user.name", 0]
                        },
                        userProfile: {
                            $concat: [process.env.BASEURL, { $arrayElemAt: ["$user.profileImg", 0] }]
                        },
                        caption: 1,
                        like: { $sum: "$reaction.like" },
                        sorry: { $sum: "$reaction.sorry" },
                        heart: { $sum: "$reaction.heart" },
                        sad: { $sum: "$reaction.sad" },
                        celebration: { $sum: "$reaction.celebration" },
                        strong: { $sum: "$reaction.strong" },
                        wow: { $sum: "$reaction.wow" },
                        oops: { $sum: "$reaction.oops" },
                        dislike: { $sum: "$reaction.dislike" },
                    }
                }
            ])
            return send(res, HttpStatus.SUCCESS_CODE, HttpStatus.SUCCESS_CODE, Message.POST_LIST_SUCESS, reaction);
        } catch (error) {
            console.log('signupUser', error);
            return send(res, HttpStatus.INTERNAL_SERVER_CODE, HttpStatus.INTERNAL_SERVER_CODE, Message.SOMETHING_WENT_WRONG, null);
        }
    },
    /**
     * This function is use for delete post 
     * @param {} req.params.postId
     * @body {} res
     * @returns
     */
    deletepost: async function (req, res) {
        try {
            if (Service.hasValidatorErrors(req, res)) {
                return;
            }
            var post = await postSchema.findOne({ _id: req.params.postId, isDeleted: false })
            if (!post) {
                return send(res, HttpStatus.UNAUTHORIZED_CODE, ErrorCode.NO_RECORDED_FOUND, Message.POST_NOT_FOUND, null)
            }
            fs.unlink('.' + post.file, (err) => {
                if (err) {
                    console.log(err);
                }
            })
            post.isDeleted = true;
            var save = await post.save()
            if (!save) {
                return send(res, HttpStatus.BAD_REQUEST_STATUS_CODE, ErrorCode.REQUIRED_CODE, Message.DATA_NOT_SAVE, null)
            }
            return send(res, HttpStatus.SUCCESS_CODE, HttpStatus.SUCCESS_CODE, Message.POST_DELETE_SUCESS, null);
        } catch (error) {
            console.log('signupUser', error);
            return send(res, HttpStatus.INTERNAL_SERVER_CODE, HttpStatus.INTERNAL_SERVER_CODE, Message.SOMETHING_WENT_WRONG, null);
        }
    },
    /**
     * This function is use for add Reaction 
     * @param {} req.params.postId
     * @body {} req.body.like
     * @body {} req.body.heart
     * @body {} req.body.sorry
     * @body {} req.body.said
     * @body {} req.body.celebration
     * @body {} req.body.strong
     * @body {} req.body.wow
     * @body {} req.body.oops
     * @body {} req.body.dislike
     * @body {} res
     * @returns
     */
     addReaction: async function (req, res) {
        try {
            var post = await postSchema.findOne({ _id: req.params.postId, isDeleted: false })
            if (!post) {
                return send(res, HttpStatus.UNAUTHORIZED_CODE, ErrorCode.NO_RECORDED_FOUND, Message.POST_NOT_FOUND, null)
            }
            var reaction = await reactionSchema.findOne({ productId: req.params.postId, userId: req.authUser._id, isDeleted: false })
            if (reaction) {
                return send(res, HttpStatus.BAD_REQUEST_STATUS_CODE, ErrorCode.INVALID_CODE, Message.REACTION_ADDED, null)
            }
            var newReaction = new reactionSchema
            newReaction.userId = req.authUser._id
            newReaction.postId = req.params.postId
            newReaction.like = req.body.like
            newReaction.heart = req.body.heart
            newReaction.sorry = req.body.sorry
            newReaction.said = req.body.said
            newReaction.celebration = req.body.celebration
            newReaction.strong = req.body.strong
            newReaction.wow = req.body.wow
            newReaction.oops = req.body.oops
            newReaction.dislike = req.body.dislike
            var save = await newReaction.save()
            if (!save) {
                return send(res, HttpStatus.BAD_REQUEST_STATUS_CODE, ErrorCode.REQUIRED_CODE, Message.DATA_NOT_SAVE, null)
            }
            return send(res, HttpStatus.SUCCESS_CODE, HttpStatus.SUCCESS_CODE, Message.POST_ADD_SUCESS, {
                id: newReaction.id
            });
        } catch (error) {
            console.log('signupUser', error);
            return send(res, HttpStatus.INTERNAL_SERVER_CODE, HttpStatus.INTERNAL_SERVER_CODE, Message.SOMETHING_WENT_WRONG, null);
        }
    },
}