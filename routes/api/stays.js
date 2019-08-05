const express = require('express');
const router = express.Router();

// Item Model
const Stay = require('../../models/Stay');

// @route   GET api/stays
// @desc    Get All Stays
// @access  Public
router.get('/', (req, res) => {
    Stay.find()
        .sort({ star: -1 })
        .limit(8)
        .then(items => res.json(items))
});

// @route   POST api/stays
// @desc    Create A Stay
// @access  Public
router.post('/', (req, res) => {
    const newStay = new Stay({
        picture: req.body.picture,
        type: req.body.type,
        location: req.body.location,
        title: req.body.title,
        price: req.body.price,
        total_review: req.body.total_review,
        city: req.body.city,
        star: req.body.star,
        gallery: req.body.gallery,
        description: req.body.description,
        amenity: req.body.amenity,
        user_id: req.body.user_id,
        location_in_map: req.body.location_in_map,
        max_guest: req.body.max_guest,
        bedroom: req.body.bedroom,
        bed: req.body.bed,
        bathroom: req.body.bathroom
    });

    newStay.save().then(stay => res.json(stay));
});

// @route   DELETE api/stays/:id
// @desc    Delete A Stay
// @access  Public
router.delete('/:id', (req, res) => {
    Stay.findById(req.params.id)
        .then(stay => stay.remove().then(() => res.json({success: true})))
        .catch(err => res.status(404).json({success: false}));
});

// @route   GET api/stays/:city
// @desc    Find Stays
// @access  Public
router.get('/:city', (req, res) => {
    Stay.find({
        city: req.params.city
    })
        // .limit(20)
        .then(items => res.json(items))
});

// @route   GET api/stays/byId/:id
// @desc    Find Stays by Id
// @access  Public
router.get('/byid/:id', (req, res) => {
    Stay.find({
        _id: req.params.id
    })
        // .limit(20)
        .then(items => res.json(items))
});

module.exports = router;