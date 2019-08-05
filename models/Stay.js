const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const StaySchema = new Schema({
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
        required: false
    },
    star: {
        type: Number,
        required: false
    },
    city: {
        type: String,
        required: true
    },
    gallery: {
        type: Array,
        required: false
    },
    description: {
        type: String,
        required: true
    },
    amenity: {
        type: Array,
        required: false
    },
    user_id: {
        type: String,
        required: true
    },
    location_in_map: {
        type: Object,
        required: false
    },
    max_guest: {
        type: String,
        required: false
    },
    bedroom: {
        type: String,
        required: false
    },
    bed: {
        type: String,
        required: false
    },
    bathroom: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Stay = mongoose.model('stay',StaySchema);