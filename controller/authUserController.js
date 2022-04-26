const userSchema = require("../models/user");
const Service = require("../helper/index");
const send = Service.sendResponse;
const { HttpStatus, ErrorCode } = require("../helper/enum")
const { Message } = require("../helper/localization");
const fs = require('fs');
const bcrypt = require('bcrypt');
const mailService = require("../helper/email")
const jwt = require("jsonwebtoken");
const jwt_decode = require("jwt-decode");

module.exports = {
    /**
     * This function is use for signup user
     * @body {} req.body.name
     * @body {} req.body.userName
     * @body {} req.body.email
     * @body {} req.body.password
     * @body {} req.body.country
     * @body {} req.files.profileImg
     * @body {} res
     * @returns
     */
    signupUser: async function (req, res) {
        try {
            if (Service.hasValidatorErrors(req, res)) {
                return;
            }
            var user = await userSchema.findOne({ email: req.body.email, isDeleted: false })
            if (user) {
                return send(res, HttpStatus.UNAUTHORIZED_CODE, ErrorCode.INVALID_CODE, Message.USER_ALLREADY_REGISTER, null)
            }
            var newUser = new userSchema
            newUser.name = req.body.name
            newUser.userName = req.body.userName
            newUser.email = req.body.email
            newUser.password = await Service.bcryptPassword(req.body.password)
            newUser.country = req.body.country
            var save = await newUser.save()
            if (!save) {
                return send(res, HttpStatus.BAD_REQUEST_STATUS_CODE, ErrorCode.REQUIRED_CODE, Message.DATA_NOT_SAVE, null)
            }
            if (req.files) {
                var img = req.files.profileImg
                var fileName = req.files.profileImg.name
                const folderName = newUser.id
                fs.mkdir('./uploads/' + folderName, (err) => {
                    if (err) {
                        console.log(err);
                    }
                })
                img.mv('./uploads/' + folderName + '/' + fileName)
                var path = '/uploads/' + folderName + '/' + fileName
                newUser.profileImg = path
                var save = await newUser.save()
                if (!save) {
                    return send(res, HttpStatus.BAD_REQUEST_STATUS_CODE, ErrorCode.REQUIRED_CODE, Message.DATA_NOT_SAVE, null)
                }
            }
            var token = {
                token: await Service.generateToken(newUser)
            }
            return send(res, HttpStatus.SUCCESS_CODE, HttpStatus.SUCCESS_CODE, Message.USER_SIGNUP, token);
        } catch (error) {
            console.log('signupUser', error);
            return send(res, HttpStatus.INTERNAL_SERVER_CODE, HttpStatus.INTERNAL_SERVER_CODE, Message.SOMETHING_WENT_WRONG, null);
        }
    },
    /**
     * This function is use for logIn user
     * @body {} req.body.email
     * @body {} req.body.password
     * @body {} res
     * @returns
     */
    logInUser: async function (req, res) {
        try {
            if (Service.hasValidatorErrors(req, res)) {
                return;
            }
            var user = await userSchema.findOne({ email: req.body.email, isDeleted: false })
            if (!user) {
                return send(res, HttpStatus.BAD_REQUEST_STATUS_CODE, ErrorCode.NO_RECORDED_FOUND, Message.USER_NOT_REGISTER, null)
            }
            const password = await bcrypt.compare(req.body.password, user.password)
            if (user.email == req.body.email && password) {
                var token = {
                    token: await Service.generateToken(user)
                }
                return send(res, HttpStatus.SUCCESS_CODE, HttpStatus.SUCCESS_CODE, Message.USER_LOGIN, token);
            }
            return send(res, HttpStatus.BAD_REQUEST_STATUS_CODE, ErrorCode.INVALID_CODE, Message.PASSWORD_INVAID, null)
        } catch (error) {
            console.log('signupUser', error);
            return send(res, HttpStatus.INTERNAL_SERVER_CODE, HttpStatus.INTERNAL_SERVER_CODE, Message.SOMETHING_WENT_WRONG, null);
        }
    },
    /**
     * This function is use for forgotPassword
     * @body {} req.body.email
     * @body {} res
     * @returns
     */
    forgotPassword: async function (req, res) {
        try {
            if (Service.hasValidatorErrors(req, res)) {
                return;
            }
            var user = await userSchema.findOne({ email: req.body.email, isDeleted: false })
            if (!user) {
                return send(res, HttpStatus.BAD_REQUEST_STATUS_CODE, ErrorCode.NO_RECORDED_FOUND, Message.USER_NOT_REGISTER, null)
            }
            const secKey = user._id + process.env.JWT_SECRET;
            const token = jwt.sign({ userId: user._id }, secKey, {
                expiresIn: '1d',
            });
            var recovery_token = user.id + '/' + token
            await mailService.sendMail(user.email, recovery_token)
            return send(res, HttpStatus.SUCCESS_CODE, HttpStatus.SUCCESS_CODE, Message.LINK_SEND, null);
        } catch (error) {
            console.log('signupUser', error);
            return send(res, HttpStatus.INTERNAL_SERVER_CODE, HttpStatus.INTERNAL_SERVER_CODE, Message.SOMETHING_WENT_WRONG, null);
        }
    },
    /**
     * This function is use for forgotPassword
     * @param {} req.params.userId
     * @param {} req.params.token
     * @body {} req.body.password
     * @body {} req.body.confirmPassword
     * @body {} res
     * @returns
     */
    resetPassword: async function (req, res) {
        try {
            if (Service.hasValidatorErrors(req, res)) {
                return;
            }

            var user = await userSchema.findOne({ _id: req.params.userId, isDeleted: false })
            if (!user) {
                return send(res, HttpStatus.UNAUTHORIZED_CODE, ErrorCode.NO_RECORDED_FOUND, Message.USER_NOT_FOUND, null)
            }
            const newSecKey = user._id + process.env.JWT_SECRET;
            const tokenVerify = jwt.verify(req.params.token, newSecKey);
            if (!tokenVerify) {
                return send(res, HttpStatus.UNAUTHORIZED, ErrorCode.INVALID_CODE, Message.TOKEN_INVALID, null);
            }
            if (req.body.password != req.body.confirmPassword) {
                return send(res, HttpStatus.BAD_REQUEST_STATUS_CODE, ErrorCode.INVALID_CODE, Message.PASSWORD_NOT_MATCH, null)
            }
            user.password = await Service.bcryptPassword(req.body.password)
            var save = await user.save()
            if (!save) {
                return send(res, HttpStatus.BAD_REQUEST_STATUS_CODE, ErrorCode.REQUIRED_CODE, Message.DATA_NOT_SAVE, null)
            }
            return send(res, HttpStatus.SUCCESS_CODE, HttpStatus.SUCCESS_CODE, Message.PASSWORD_CHANGE, {
                id: user.id
            });
        } catch (error) {
            console.log('signupUser', error);
            return send(res, HttpStatus.INTERNAL_SERVER_CODE, HttpStatus.INTERNAL_SERVER_CODE, Message.SOMETHING_WENT_WRONG, null);
        }
    },
    /**
    * This function is use for update user profile 
    * @body {} req.body.token
    * @body {} res
    * @returns
    */
    signupgoogle: async function (req, res) {
        try {
            if (Service.hasValidatorErrors(req, res)) {
                return;
            }
            var token = req.body.token
            var decoded = jwt_decode(token);
            if (!decoded.aud == process.env.CLIENT_ID) {
                return send(res, HttpStatus.UNAUTHORIZED, ErrorCode.INVALID_CODE, Message.WHO_ARE_YOU, null);
            }
            var user = await userSchema.findOne({ email: decoded.email, isDeleted: false })
            if (!user) {
                var user = new userSchema
                user.email = decoded.email
                var save = await user.save()
                if (!save) {
                    return send(res, HttpStatus.INTERNAL_SERVER_CODE, HttpStatus.INTERNAL_SERVER_CODE, Message.ADDRESS_NOT_SAVE, null);
                }
                const data = {
                    loginToken: await Service.generateToken(user),
                };
                return send(res, HttpStatus.SUCCESS_CODE, HttpStatus.SUCCESS_CODE, Message.USER_LOGIN, data);
            }
            const data = {
                loginToken: await Service.generateToken(user),
            };
            return send(res, HttpStatus.SUCCESS_CODE, HttpStatus.SUCCESS_CODE, Message.USER_SIGNUP, data);

        } catch (error) {
            console.log('signupgoogle', error);
            return send(res, HttpStatus.INTERNAL_SERVER_CODE, HttpStatus.INTERNAL_SERVER_CODE, Message.SOMETHING_WENT_WRONG, null);
        }
    },
}