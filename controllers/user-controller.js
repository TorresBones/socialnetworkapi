const { User } = require("../models/");

const userController = {

    getAllUsers(req, res) {
        User.find({})
        .select("-__v")
        .populate([{
            path: "friends",
            select: "-__v"
        },
        {
            path: "thoughts",
            select: "-__v"
        }])
        .then(dbUserData => res.json(dbUserData))
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        });
    },

    getUserById({ params }, res) {
        User.findOne({ _id: params.userId }) 
        .populate([{
            path: "friends",
            select: "-__v"
        },
        {
            path: "thoughts",
            select: "-__v"
        }
    ])
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(400);
        });
    },

    createUser({ body }, res) {
        User.create(body)
        .then((dbUserData) => res.json(dbUserData))
        .catch((err) => res.status(400).json(err));
    },

    updateUser({ params, body }, res ) {
        User.findOneAndUpdate({ _id: params.userId }, body, {
            new: true,
            runValidators: true,
        })
        .then((dbUserData) => {
            if (!dbUserData) {
                res.status(404).json({ message: "No user found with this ID." });
                return;
            }
            res.json(dbUserData);
        })
        .catch((err) => {
            res.status(400).json(err)
        });
    },

    deleteUser({ params }, res ) {
        User.findOneAndDelete ({ _id: params.userId })
        .then((dbUserData) => {
            if (!dbUserData) {
                res.status(404).json({ message: "No user found with this ID." });
                return; 
            }
            res.json(dbUserData);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
    },
    
    addFriend ({ params, body }, res ) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $push: { friends: params.friendId }},
            { new: true, runValidators: true }
        )
        .then((dbUserData) => {
            if (!dbUserData) {
                res.status(404).json({ message: "No user found with this ID." })
                return;
            }
            res.json(dbUserData);
        })
        .catch((err) => res.json(err));
    },

    removeFriend ({ params }, res) {
        console.log("Remove Friend", params.friendId);
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId }},
            { new: true }
        )
        .then((dbUserData) => res.json(dbUserData))
        .catch((err) => res.json(err));
    },
};

module.exports = userController;