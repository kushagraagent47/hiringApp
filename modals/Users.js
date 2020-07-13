const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//CREATE SCHEMA

const ItemSchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    resume: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    qualification: {
        type: String,
        required: true
    }
})

module.exports = Users = mongoose.model('users', ItemSchema);