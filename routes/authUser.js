const express = require('express');
const router = express.Router();
const userController = require("../controller/authUserController");
let { Message } = require("../helper/localization");
const { body, param } = require("express-validator");

router.post("/signup",
    body("name").exists().withMessage(Message.NAME_IS_REQUIRED).not().isEmpty(),
    body("userName").exists().withMessage(Message.USER_NAME_REQUIRED).not().isEmpty(),
    body("email").exists().not().isEmpty().withMessage(Message.EMAIL_IS_REQUIRED).isEmail().normalizeEmail().withMessage(Message.EMAIL_FORMAT),
    body("password").exists().withMessage(Message.PASSWORD_IS_REQUIRED).not().isEmpty(),
    body("country").exists().withMessage(Message.COUNTRY_NAME_REQUIRED).not().isEmpty(),
    userController.signupUser);

router.post("/logIn",
    body("email").exists().not().isEmpty().withMessage(Message.EMAIL_IS_REQUIRED).isEmail().normalizeEmail().withMessage(Message.EMAIL_FORMAT),
    body("password").exists().withMessage(Message.PASSWORD_IS_REQUIRED).not().isEmpty(),
    userController.logInUser);

router.post("/forgotPassword",
    body("email").exists().not().isEmpty().withMessage(Message.EMAIL_IS_REQUIRED).isEmail().normalizeEmail().withMessage(Message.EMAIL_FORMAT),
    userController.forgotPassword);

router.post("/resetPassword/:userId/:token",
    param("userId").exists().isMongoId().withMessage(Message.USER_ID_IS_REQUIRED).not().isEmpty(),
    param("token").exists().withMessage(Message.TOKEN_IS_REQUIRED).not().isEmpty(),
    body("password").exists().withMessage(Message.PASSWORD_IS_REQUIRED).not().isEmpty(),
    body("confirmPassword").exists().withMessage(Message.PASSWORD_IS_REQUIRED).not().isEmpty(),
    userController.resetPassword);


router.post("/signup/google",
    body("token").exists().withMessage(Message.TOKEN_IS_REQUIRED).not().isEmpty(),
    userController.signupgoogle);

module.exports = router