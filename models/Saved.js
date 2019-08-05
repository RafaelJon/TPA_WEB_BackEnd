const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const SavedSchema = new Schema({
    picture: {
        type: String,
        required: false
    },
    title: {
        type: String,
        required: true
    },
    place: {
        type: Array,
        required: false
    },
    experience: {
        type: Array,
        required: false
    },
    user_id: {
        type: String,
        required: true
    },
    isPrivate: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Saved = mongoose.model('saved',SavedSchema);