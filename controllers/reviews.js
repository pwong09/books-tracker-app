const Book = require('../models/book');
const User = require('../models/user');

module.exports = {
    create: createReview
}

function createReview(req, res){
    Book.findById(req.params.id, function(err, book) {
        req.body.user = req.user._id;
        req.body.userName = req.user.name;
        req.body.userAvatar = req.user.avatar;
        console.log(req.body)
        book.reviews.push(req.body);
        console.log('hi')
        book.save(function(err) {
            if (err) return res.send(err);
            res.redirect(`/books/${req.params.id}`);
        });
    })
}