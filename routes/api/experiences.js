const express = require('express');
const router = express.Router();

// Item Model
const Experience = require('../../models/Experience');

// @route   GET api/experiences
// @desc    Get All Experiences
// @access  Public
router.get('/', (req, res) => {
    Experience.find()
        .sort({ star: -1 })
        .limit(6)
        .then(items => res.json(items))
});

// @route   POST api/experiences
// @desc    Create A Experience
// @access  Public
router.post('/', (req, res) => {
    const newExperience = new Experience({
        picture: req.body.picture,
        type: req.body.type,
        location: req.body.location,
        title: req.body.title,
        price: req.body.price,
        total_review: req.body.total_review,
        city: req.body.city,
        star: req.body.star,
        hour: req.body.hour,
        amenity: req.body.amenity,
        what_to_bring: req.body.what_to_bring,
        gallery: req.body.gallery,
        description: req.body.description,
        location_in_map: req.body.location_in_map,
        user_id: req.body.user_id
    });

    newExperience.save().then(expe => res.json(expe));
});

// @route   DELETE api/experiences/:id
// @desc    Delete A Experience
// @access  Public
router.delete('/:id', (req, res) => {
    Stay.findById(req.params.id)
        .then(expe => expe.remove().then(() => res.json({success: true})))
        .catch(err => res.status(404).json({success: false}));
});

// @route   GET api/experiences/:city
// @desc    Find Experiences
// @access  Public
router.get('/:city', (req, res) => {
    Experience.find({
        city: req.params.city
    })
        // .limit(20)
        .then(items => res.json(items))
});

// @route   GET api/experiences/byId/:id
// @desc    Find Experiences by Id
// @access  Public
router.get('/byid/:id', (req, res) => {
    Experience.find({
        _id: req.params.id
    })
        .then(items => res.json(items))
});

module.exports = router;