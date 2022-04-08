const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema ({
    content: String,
    rating: {type: Number, min: 1, max: 5},
    user: {type: Schema.Types.ObjectId, ref: 'User'}
}, {timestamps: true
});

const bookSchema = new Schema ({
    title: {type: String, required: true},
    author: {type: String, required: true},
    isbn: String,
    imageLinks: String,
    recommend: {type: String},
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    reviews: [reviewSchema]
});

module.exports = mongoose.model('Book', bookSchema);