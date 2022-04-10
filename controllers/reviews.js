const Book = require('../models/book');
const User = require('../models/user');

module.exports = {
    create: createReview,
    delete: deleteReview
}

function createReview(req, res){
    Book.findById(req.params.id, function(err, book) {
        req.body.user = req.user._id;
        req.body.userName = req.user.name;
        req.body.userAvatar = req.user.avatar;
        book.reviews.push(req.body);
        console.log(book.reviews)
        console.log('this is book\'s reviews')
        book.save(function(err) {
            if (err) return res.send(err);
            res.redirect(`/books/${req.params.id}`);
        });
    })
}

function deleteReview(req, res){
    console.log(req.params.id)
    console.log('this is req params id for the review')
    Book.findOne({'reviews._id': req.params.id}).then(function(book) {
        console.log(book);
        const review = book.reviews.id(req.params.id);
        if (!review.user.equals(req.user._id)) return res.redirect(`/books/${book._id}`);
        review.remove();
        book.save().then(function() {
            res.redirect(`/books/${book._id}`);
        }).catch(function(err){
            return next(err);
        })
    })
}