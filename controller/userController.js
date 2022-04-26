const Service = require("../helper/index");
const send = Service.sendResponse;
const { HttpStatus, ErrorCode } = require("../helper/enum")
const { Message } = require("../helper/localization");
const bcrypt = require('bcrypt');
const fs = require('fs');

module.exports = {

    /**
     * This function is use for changePassword
     * @param {} req.params.userId
     * @body {} req.body.oldPassword
     * @body {} req.body.newPassword
     * @body {} req.body.confirmPassword
     * @body {} res
     * @returns
     */
    changePassword: async function (req, res) {
        try {
            if (Service.hasValidatorErrors(req, res)) {
                return;
            }
            const checkPassword = await bcrypt.compare(req.body.oldPassword, req.authUser.password)
            if (!checkPassword) {
                return send(res, HttpStatus.BAD_REQUEST_STATUS_CODE, ErrorCode.INVALID_CODE, Message.OLD_PASSWORD_INVAID, null)
            }
            if (req.body.newPassword != req.body.confirmPassword) {
                return send(res, HttpStatus.BAD_REQUEST_STATUS_CODE, ErrorCode.INVALID_CODE, Message.PASSWORD_NOT_MATCH, null)
            }
            req.authUser.password = await Service.bcryptPassword(req.body.newPassword)
            var save = await req.authUser.save()
            if (!save) {
                return send(res, HttpStatus.BAD_REQUEST_STATUS_CODE, ErrorCode.REQUIRED_CODE, Message.DATA_NOT_SAVE, null)
            }
            return send(res, HttpStatus.SUCCESS_CODE, HttpStatus.SUCCESS_CODE, Message.PASSWORD_CHANGE, {
                id: req.authUser.id
            });
        } catch (error) {
            console.log('signupUser', error);
            return send(res, HttpStatus.INTERNAL_SERVER_CODE, HttpStatus.INTERNAL_SERVER_CODE, Message.SOMETHING_WENT_WRONG, null);
        }
    },
    /**
     * This function is use for signup user
     * @body {} req.body.name
     * @body {} req.body.userName
     * @body {} req.body.dateOfBirth
     * @body {} req.body.password
     * @body {} req.body.country
     * @body {} req.body.bio
     * @body {} req.files.profileImg
     * @body {} res
     * @returns
     */
    updateUser: async function (req, res) {
        try {
            if (Service.hasValidatorErrors(req, res)) {
                return;
            }
            console.log(req.body);
            console.log(req.authUser);
            req.authUser.name = req.body.name
            req.authUser.userName = req.body.userName
            req.authUser.dateOfBirth = req.body.dateOfBirth
            req.authUser.password = await Service.bcryptPassword(req.body.password)
            req.authUser.country = req.body.country
            req.authUser.bio = req.body.bio
            var save = await req.authUser.save()
            console.log(req.authUser);
            if (!save) {
                return send(res, HttpStatus.BAD_REQUEST_STATUS_CODE, ErrorCode.REQUIRED_CODE, Message.DATA_NOT_SAVE, null)
            }
            if (req.files) {
                var img = req.files.profileImg
                var fileName = req.files.profileImg.name
                const folderName = req.authUser.id
                if (!fs.existsSync('./uploads/' + folderName)) {
                    fs.mkdir('./uploads/' + folderName, (err) => {
                        if (err) {
                            console.log(err);
                        }
                    })
                } else {
                    fs.unlink('.' + req.authUser.profileImg, (err) => {
                        if (err) {
                            console.log(err);
                        }
                    })
                }
                img.mv('./uploads/' + folderName + '/' + fileName)
                req.authUser.profileImg = '/uploads/' + folderName + '/' + fileName
                var save = await req.authUser.save()
                if (!save) {
                    return send(res, HttpStatus.BAD_REQUEST_STATUS_CODE, ErrorCode.REQUIRED_CODE, Message.DATA_NOT_SAVE, null)
                }
            }
            return send(res, HttpStatus.SUCCESS_CODE, HttpStatus.SUCCESS_CODE, Message.USER_UPDATED, {
                id: req.authUser.id
            });
        } catch (error) {
            console.log('signupUser', error);
            return send(res, HttpStatus.INTERNAL_SERVER_CODE, HttpStatus.INTERNAL_SERVER_CODE, Message.SOMETHING_WENT_WRONG, null);
        }
    },
}