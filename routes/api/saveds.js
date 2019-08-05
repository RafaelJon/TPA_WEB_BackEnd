const express = require('express');
const router = express.Router();

// Item Model
const Saved = require('../../models/Saved');

// @route   GET api/saved
// @desc    Get User Saved
// @access  Public
router.get('/:userId', (req, res) => {
    Saved.find({ user_id: req.params.userId})
        .then(saved => res.json(saved))
});

// @route   PUT api/saved
// @desc    Update User Saved Places
// @access  Public
router.put('/stay/:folderId', (req, res) => {
    Saved.update(
        {_id: req.params.folderId},
        {
            $push: {place: req.body._id},
            picture: req.body.picture
        }
    )
        .then(saved => res.json(saved))
});

// @route   PUT api/saved
// @desc    Update User Saved Experiences
// @access  Public
router.put('/experience/:folderId', (req, res) => { 
    Saved.update(
        {_id: req.params.folderId},
        {
            $push: {experience: req.body._id},
            picture: req.body.picture
        }
    )
        .then(saved => res.json(saved))
});

// @route   POST api/saved
// @desc    Create A Saved List
// @access  Public
router.post('/', (req, res) => {
    const newSaved = new Saved({
        picture: req.body.picture,
        title: req.body.title,
        place: req.body.place,
        experience: req.body.experience,
        user_id: req.body.user_id,
        isPrivate: req.body.isPrivate
    });
    newSaved.save().then(saved => res.json(saved));
});

// @route   GET api/saveds/byid/:id
// @desc    Find Saved by Id
// @access  Public
router.get('/byid/:id', (req, res) => {
    Saved.find({
        _id: req.params.id
    })
        .then(items => res.json(items))
});

module.exports = router;