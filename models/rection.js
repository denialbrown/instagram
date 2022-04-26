"use strict";
const mongoose = require("mongoose");

const reactionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    like: {
        type: Number,
        enum: [0, 1],
        default: 0,
    },
    heart: {
        type: Number,
        enum: [0, 1],
        default: 0,
    },
    sorry: {
        type: Number,
        enum: [0, 1],
        default: 0,
    },
    said: {
        type: Number,
        enum: [0, 1],
        default: 0,
    },
    celebration: {
        type: Number,
        enum: [0, 1],
        default: 0,
    },
    strong: {
        type: Number,
        enum: [0, 1],
        default: 0,
    },
    wow: {
        type: Number,
        enum: [0, 1],
        default: 0,
    },
    oops: {
        type: Number,
        enum: [0, 1],
        default: 0,
    },
    dislike: {
        type: Number,
        enum: [0, 1],
        default: 0,
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

module.exports = mongoose.model("reaction", reactionSchema);


