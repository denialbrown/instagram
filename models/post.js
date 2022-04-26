"use strict";
const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    userId: {
        type: String,
    },
    caption: {
        type: String,
    },
    file: {
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

module.exports = mongoose.model("post", postSchema);


