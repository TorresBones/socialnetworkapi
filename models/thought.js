const { Schema, model } = require('mongoose');
const reactionSchema = require('./reaction');
const dateFormat = require('../utils/dateFormat');
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: false,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => dateFormat(timestamp)
        },
        username: {
            type: String,
            required: true
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            getters: true
        },
        id: false
    }
);
thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const thought = model('thought', thoughtSchema);

module.exports = thought;