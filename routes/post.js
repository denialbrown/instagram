const express = require('express');
const router = express.Router();
const postController = require("../controller/postController");
const middleware = require("../helper/middleware")
let { Message } = require("../helper/localization");
const {body, param } = require("express-validator");

router.post("/add/post", [middleware.authenticateUser], postController.addPost);

router.get("/get/post/:postId", [middleware.authenticateUser],
    param("postId").exists().isMongoId().withMessage(Message.POST_ID_REQUIRED),
    postController.getPost);

router.delete("/delete/post/:postId", [middleware.authenticateUser],
    param("postId").exists().isMongoId().withMessage(Message.POST_ID_REQUIRED),
    postController.deletepost);

router.post("/add/reaction/:postId", [middleware.authenticateUser],
    body("like").exists().isIn([0, 1]).withMessage(Message.ENTER_VALID_REACTION),
    body("heart").exists().isIn([0, 1]).withMessage(Message.ENTER_VALID_REACTION),
    body("sorry").exists().isIn([0, 1]).withMessage(Message.ENTER_VALID_REACTION),
    body("sad").exists().isIn([0, 1]).withMessage(Message.ENTER_VALID_REACTION),
    body("celebration").exists().isIn([0, 1]).withMessage(Message.ENTER_VALID_REACTION),
    body("strong").exists().isIn([0, 1]).withMessage(Message.ENTER_VALID_REACTION),
    body("wow").exists().isIn([0, 1]).withMessage(Message.ENTER_VALID_REACTION),
    body("oops").exists().isIn([0, 1]).withMessage(Message.ENTER_VALID_REACTION),
    body("dislike").exists().isIn([0, 1]).withMessage(Message.ENTER_VALID_REACTION),
    postController.addReaction);

module.exports = router