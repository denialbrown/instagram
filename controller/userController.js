const userSchema = require("../models/user");
const Service = require("../helper/index");
const send = Service.sendResponse;
const { HttpStatus, ErrorCode } = require("../helper/enum")
const { Message } = require("../helper/localization");
const fs = require('fs');

module.exports = {
    /**
     * This function is use for signup user
     * @body {} req.body.userName
     * @body {} res
     * @returns
     */
    signupUser: async function (req, res) {
        try {
            if (Service.hasValidatorErrors(req, res)) {
                return;
            }
            console.log(req.body);
            console.log(req.files.profileImg);
            var newUser = new userSchema
            newUser.name = req.body.name
            newUser.userName = req.body.userName
            newUser.email = req.body.email
            newUser.password = req.body.password
            newUser.country = req.body.country
            var save = newUser.save()
            if (!save) {
                return send(res, HttpStatus.BAD_REQUEST_STATUS_CODE, ErrorCode.REQUIRED_CODE, Message.USER_NOT_SAVE, null)
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
                var path = process.env.BASEURL + '/uploads/' + folderName + '/' + fileName
                newUser.profileImg = path
                var save = newUser.save()
                if (!save) {
                    return send(res, HttpStatus.BAD_REQUEST_STATUS_CODE, ErrorCode.REQUIRED_CODE, Message.USER_NOT_SAVE, null)
                }
                
            }
            return send(res, HttpStatus.INTERNAL_SERVER_CODE, HttpStatus.INTERNAL_SERVER_CODE, Message.SOMETHING_WENT_WRONG, null);
        } catch (error) {
            console.log('signupUser', error);
            return send(res, HttpStatus.INTERNAL_SERVER_CODE, HttpStatus.INTERNAL_SERVER_CODE, Message.SOMETHING_WENT_WRONG, null);
        }
    },
}