const express = require('express');
const router = express.Router();
const userController = require("../controller/userController");
const middleware = require("../helper/middleware")
let { Message } = require("../helper/localization");
const { body } = require("express-validator");

router.post("/signup",
    // body("name").exists().withMessage(Message.NAME_IS_REQUIRED).not().isEmpty(),
    // body("userName").exists().withMessage(Message.USER_NAME_REQUIRED).not().isEmpty(),
    userController.signupUser);

module.exports = router