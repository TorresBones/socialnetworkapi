const { Thought, User } = require("../models");

const thoughtController = {
    getAllThoughts(req, res) {
        Thought.find({})
            .populate({
                path:"reactions",
                select: "-_ _v"
            })
            .sort({ createAt: -1 })
            .then((dbToughtData) => res.json(dbToughtData))
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.thoughtId })
        .populate({
            path: "reactions",
            select: "-__v"
        })
        .then((dbToughtData) => {
            if (!dbToughtData) {
                res.status(404).json({ message: "No thought found with that id." });
                return;
            }
            res.json(dbToughtData);
        })
        .catch((err) => {
            console.log(err);
            res.satus(500).json(err);
        });
    },

    addThought({ params, body }, res) {
        Thought.create(body)
        .then(({ _id }) => {
            return User.findOneAndUpdate(
                { _id: params.userId },
                { $push: { thoughts: _id } },
                { new: true }
            );
        })
        .then((dbUserData) => {
            if (!dbUserData) {
                res.status(404).json({ message: "No user found with this id." });
                return;
            }
            res.json(dbUserData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err)
        });
    },

    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.thoughtId }, body, {
            new: true,
            runValidators: true,
        })
        .then((dbToughtData) => {
            if (!dbToughtData) {
                res.status(404).json({ message: "No thought found with this id." });
                return;
            }
            res.json(dbToughtData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err)
        });
    },

    removeThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId })
        .then((deletedThought) => {
            if (!deletedThought) {
                return res.stauts(404). json({ message: "No thought found with this id."})
            }
            return User.findOneAndUpdate(
                { _id: deletedThought.userId },
                { $pull: { thoughts: params.thoughtId } },
                { new: true }
            );
        })
            .then((dbUserData) => {
                if (!dbUserData) {
                    res.status(404).json({ message: "No user found with this ID." });
                    return;
                }
                res.json(dbUserData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
     });
    },

    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true, runValidators: true }
        )
        .then((dbToughtData) => {
            if (!dbToughtData) {
                res.status(404).json({ message: "No user found with this id." });
                return;
            }
            res.json(dbToughtData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
    });
},

    removeReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true }
        )
        .then((dbToughtData) => {
            if (!dbToughtData) {
            res.status(404).json({ message: "No thought found witht this id." });
            return;
            }
            res.json(dbToughtData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
};

module.exports = thoughtController;