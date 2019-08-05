const express = require('express');
const router = express.Router();

// Item Model
const Review = require('../../models/Review');

// @route   GET api/reviews
// @desc    Get Review based on Stay
// @access  Public
router.get('/:id', (req, res) => {
    Review.find({ stay_expe_id: req.params.id})
        .then(review => res.json(review))
});

// @route   GET api/reviews
// @desc    Get Review based on UserID
// @access  Public
router.get('/user/:id', (req, res) => {
    Review.find({ user_id: req.params.id})
        .then(review => res.json(review))
});

// @route   POST api/reviews
// @desc    Create A Reviews
// @access  Public
router.post('/', (req, res) => {
    const newReview= new Review({
        user_id: req.body.user_id,
        stay_expe_id: req.body.stay_expe_id,
        title: req.body.title,
        description: req.body.description,
        accuracy: req.body.accuracy,
        communication: req.body.communication,
        cleanliness: req.body.cleanliness,
        location: req.body.location,
        check_in: req.body.check_in,
        value: req.body.value
    });
    newReview.save().then(review => res.json(review));
});

module.exports = router;