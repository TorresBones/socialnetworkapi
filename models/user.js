const thought = require("./thought");

const { Schema, model } = require('mongoose');
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@+\..+/, 'Provide a valid email address.'],
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'thought',
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user',
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
    }
);

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

// userSchema.pre("findOneAndDelete", { document: false, query: true }, aysnc function() {
//     console.log("User pre-delete");
//     const doc = await this.model.findOne(this.getFilter());
//     console.log("doc.username");
//     await thought.deleteMany({ username: doc.username });
// });

const user = model('user', userSchema);
module.exports = user;