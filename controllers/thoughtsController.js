const { Thought, User } = require('../models');

module.exports = {
    getAllThoughts(req, res){
        Thought.find()
        .then((thoughts) => res.status(200).json(thoughts))
        .catch((err) => res.status(500).json(err))
    },

    getThought(req ,res){
        Thought.findOne( { _id: req.params.thoughtId })
        .then((thought) => 
        !thought
            ? res.status(404).json({ message: 'No thought with that Id was found'})
            : res.status(200).json(thought)
        )
        .catch((err) => res.status(500).json(err))
    },

    



























}