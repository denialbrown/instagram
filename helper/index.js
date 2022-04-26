const { ErrorCode } = require("../helper/enum")
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const { Action } = require("../helper/localization")
const LOGIN_TOKEN_EXPIRES_IN = '30d';
const bcrypt = require('bcrypt');
const moment = require("moment");
const userSchema = require("../models/user")

module.exports = {
    sendResponse(res, status, code, message, payload) {
        return res.status(status).send(prepareResponse(code, message, payload));
    },
    hasValidatorErrors: function (req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const err = errors.array()[0];
            let msg;
            if (err.msg === "Invalid value") {
                msg = `Parameter ${err.location}.${err.param} ${err.msg}.`;
            }
            res.status(400).json(this.response(ErrorCode.REQUIRED_CODE, msg, errors.array()));
            return true;
        } else {
            return false;
        }
    },
    response: function (internalCode, message, data) {
        if (data != null || data != undefined) {
            return {
                responseCode: internalCode,
                responseMessage: message,
                responseData: data,
            };
        }
        return {
            responseCode: internalCode,
            responseMessage: message,
        };
    },
    generateToken: async function (user) {
        return generateJwt({
            sub: user._id,
            action: Action.ACCESS
        }, LOGIN_TOKEN_EXPIRES_IN);
    },
    bcryptPassword: async function (password) {
        var genSalt = await bcrypt.genSalt(10)
        var Password = await bcrypt.hash(password, genSalt)
        return Password;
    },
    generateTokenForLogIn: async function (user) {
        return generateJwt({
            sub: user._id,
            action: Action.LOGIN
        }, LOGIN_TOKEN_EXPIRES_IN);
    },
    verifyJwt: function (token) {
        try {
            let tokenData = jwt.verify(token, process.env.JWT_SECRET);
            if (tokenData && this.getCurrentTimeStampUnix() > tokenData.exp) {
                return {
                    isValid: false,
                    reason: "expired"
                };
            } else if (tokenData && this.getCurrentTimeStampUnix() < tokenData.exp) {
                return {
                    isValid: true,
                    ...tokenData
                };
            } else {
                return {
                    isValid: false,
                    reason: "invalid"
                };
            }
        } catch (err) {
            return {
                isValid: false,
                reason: "invalid"
            };
        }
    },
    getCurrentTimeStampUnix: function () {
        return moment().unix();
    },
    getUserById: async function getUserById(userId) {
        return await userSchema.findById(userId);
    }
}


function prepareResponse(status, message, data) {
    if (data != null || data != undefined) {
        return {
            responseCode: status,
            responseMessage: message,
            responseData: data,
        };
    }
    return {
        responseCode: status,
        responseMessage: message,
    };
}

async function generateJwt(payload) {

    let token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: LOGIN_TOKEN_EXPIRES_IN,
        algorithm: process.env.JWT_ALGORITHM,
    });
    return token;
}