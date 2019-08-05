const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const ExperienceSchema = new Schema({
    picture: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    total_review: {
        type: Number,
        required: true
    },
    star: {
        type: Number,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    hour: {
        type: String,
        required: true
    },
    amenity: {
        type: Array,
        required: true
    },
    what_to_bring: {
        type: String,
        required: true
    },
    gallery: {
        type: Array,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    location_in_map: {
        type: Object,
        required: false
    },
    user_id: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Experience = mongoose.model('experience',ExperienceSchema);