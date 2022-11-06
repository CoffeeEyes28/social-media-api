const router = require('express').Router();

const {
    getAllThoughts,
    getThought,
    newThought,
    updateThought,
    deleteThought,
    addThoughtReaction,
    removeThoughtReaction,
} = require('../../controllers/thoughtsController')