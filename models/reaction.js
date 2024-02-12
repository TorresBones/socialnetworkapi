const { Schema, Types } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            defaul: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: "Please, enter your reaction",
            maxLength: 280
        },
        username: {
            type: String,
            required: "Please, provide a username."
        },
            createdAt: {
                type: Date,
                default: Date.now,
                get: (createdAtVal) => dateFormat(createdAtVal),
            }
        }
    );  

    module.exports = ReactionSchema;