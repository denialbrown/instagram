const express = require('express');
const router = express.Router();
const commentController = require("../controller/commentController");
const middleware = require("../helper/middleware")
let { Message } = require("../helper/localization");
const { body, param } = require("express-validator");

router.post("/add/comment/:postId", [middleware.authenticateUser],
    param("postId").exists().isMongoId().withMessage(Message.POST_ID_REQUIRED),
    body("comment").exists().withMessage(Message.COMMENT_IS_REQUIRED).not().isEmpty(),
    commentController.addComment);

router.get("/list/comment/:postId", [middleware.authenticateUser],
    param("postId").exists().isMongoId().withMessage(Message.POST_ID_REQUIRED),
    commentController.listComment);

router.delete("/delete/comment/:commentId", [middleware.authenticateUser],
    param("commentId").exists().isMongoId().withMessage(Message.COMMENT_ID_REQUIRED),
    commentController.deleteComment);

module.exports = router