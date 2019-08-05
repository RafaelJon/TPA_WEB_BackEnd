const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const ReviewSchema = new Schema({
    user_id: {
        type: String,
        required: true
    },
    stay_expe_id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    accuracy: {
        type: Number,
        required: true
    },
    communication: {
        type: Number,
        required: true
    },
    cleanliness: {
        type: Number,
        required: true
    },
    location: {
        type: Number,
        required: true
    },
    check_in: {
        type: Number,
        required: true
    },
    value: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Review = mongoose.model('review',ReviewSchema);