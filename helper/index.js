const { ErrorCode } = require("../helper/enum")
const { validationResult } = require("express-validator");


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