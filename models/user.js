const mongoose = require('mongoose');

// Create your User Model
const userSchema = new mongoose.Schema({
    name: String,
    googleId: {
        type: String,
        required: true
    },
    email: {type: String, required: true},
    avatar: String
} , {timestamps: true    
});