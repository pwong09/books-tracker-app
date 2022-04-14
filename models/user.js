const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create User Model
const userSchema = new Schema({
    name: String,
    googleId: {
        type: String,
        required: true
    },
    email: {type: String, required: true},
    avatar: String
} , {timestamps: true    
});

module.exports = mongoose.model('User', userSchema);