const express = require('express');
const router = express.Router();
const userController = require("../controller/userController");
const middleware = require("../helper/middleware")
let { Message } = require("../helper/localization");
const { body, param } = require("express-validator");


router.post("/changePassword", [middleware.authenticateUser],
    body("oldPassword").exists().withMessage(Message.PASSWORD_IS_REQUIRED).not().isEmpty(),
    body("newPassword").exists().withMessage(Message.PASSWORD_IS_REQUIRED).not().isEmpty(),
    body("confirmPassword").exists().withMessage(Message.PASSWORD_IS_REQUIRED).not().isEmpty(),
    userController.changePassword);

router.post("/update/userProfile", [middleware.authenticateUser],
    body("name").exists().withMessage(Message.NAME_IS_REQUIRED).not().isEmpty(),
    body("userName").exists().withMessage(Message.USER_NAME_REQUIRED).not().isEmpty(),
    body("password").exists().withMessage(Message.PASSWORD_IS_REQUIRED).not().isEmpty(),
    body("country").exists().withMessage(Message.COUNTRY_NAME_REQUIRED).not().isEmpty(),
    userController.updateUser);

module.exports = router