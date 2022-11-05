const { User, Thought } = require('../models');

module.exports = {

    getAllUsers(req, res){
        User.find()
        .then((users) => res.status(200).json(users))
        .catch((err) => res.status(500).json(err));
    },

    getUser(req, res){
        User.findOne({ _id: req.params.userId})
        .populate('friends')
        .populate('thoughts')
        .select('__v')
        .then((user) => 
        !user 
            ? res.status(404).json( { message: 'No user with that Id was found'})
            : res.status(200).json(user)
        )
        .catch((err) => res.status(500).json(err));
    },

    newUser(req, res){
        User.create(req.body)
        .then((user) => res.status(200).json(user))
        .catch((err) => res.status(500).json(err));
    },

    updateUser(req, res){
        User.findOneAndUpdate(
            { _id: req.params.userId},
            { $set: req.body },
            {runValidators: true, new: true}
        )
        .then((user) =>
        !user
            ? res.status(404).json({ message: 'No user with that Id was found'})
            : res.status(200).json(user)
        )
        .catch((err) => res.status(500).json(err));
    },

    deleteUser(req, res){
        User.findOneAndDelete({ _id: req.params.userId })
        .then((user) => 
        !user
            ? res.status(404).json({ message: 'No user with that Id was found'})
            : Thought.deleteMany({ _id: { $in: user.thoughts }})
        )
        .then(() => res.status(200).json({ message: 'User and their respective thoughts have been deleted'}))
        .catch((err) => res.status(500).json(err));
    },

    addFriend(req, res){
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            {runValidators: true, new: true },
        )
        .then((user) => 
        !user
            ? res.status(404).json({ message: 'No user with that Id was found'})
            : res.status(200).json(user)
        )
        .catch((err) => res.status(500).json(err))
    },

    removeFriend(req, res){
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )
        .then((user) =>
        !user   
            ? res.status(404).json({ message: 'No user with that Id was found'})
            : res.status(200).json(user)
        )
        .catch((err) => res.status(500).json(err))
    }


};