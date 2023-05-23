const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    profileImage: String,
    fullName: String
})

module.exports = mongoose.model('users', schema)