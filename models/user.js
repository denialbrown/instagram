"use strict";
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    userName: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    country: {
        type: String,
    },
    bio: {
        type: String,
    },
    dateOfBirth: {
        type: String,
    },
    profileImg: {
        type: String,
    },
    status: {
        type: String,
        enum: ['active', 'inActive'],
        default: 'active',
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    createdAt: Number,
    updatedAt: Number,
}, {
    timestamps: true,
});

module.exports = mongoose.model("user", userSchema);


