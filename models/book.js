const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema ({
    content: String,
    rating: {type: Number, min: 1, max: 5},
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    userName: String,
    userAvatar: String
}, {timestamps: true
});

const bookSchema = new Schema ({
    googleId: String,
    title: {type: String, required: true},
    author: {type: String, required: true},
    imageLinks: String,
    recommend: {type: String, default: 'no one'},
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    reviews: [reviewSchema]
});

module.exports = mongoose.model('Book', bookSchema);