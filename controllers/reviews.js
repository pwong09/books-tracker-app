const Book = require('../models/book');

module.exports = {
    create: createReview,
    delete: deleteReview,
    update: updateReview
}

function createReview(req, res){
    Book.findById(req.params.id, function(err, book) {
        req.body.user = req.user._id;
        req.body.userName = req.user.name;
        book.reviews.push(req.body);
        book.save(function(err) {
            if (err) return res.send(err);
            res.redirect(`/books/${req.params.id}`);
        });
    })
}

function deleteReview(req, res){
    Book.findOne({'reviews._id': req.params.id}).then(function(book) {
        const review = book.reviews.id(req.params.id);
        if (!review.user.equals(req.user._id)) return res.redirect(`/books/${book._id}`);
        review.remove();
        book.save().then(function() {
            res.redirect(`/books/${book._id}`);
        }).catch(function(err){
            res.send(err);
        })
    })
}

function updateReview(req, res) {
    Book.findOne({'reviews._id': req.params.id}).then(function(book) {
        const review = book.reviews.id(req.params.id);
        if (!review.user.equals(req.user._id)) return res.redirect(`/books/${book._id}`);
        review.content = req.body.content;
        review.rating = req.body.rating;
        book.save().then(function() {
            res.redirect(`/books/${book._id}`);
        }).catch(function(err) {
            res.send(err);
        });
    });
}