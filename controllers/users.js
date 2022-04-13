const Book = require('../models/book');
const Note = require('../models/note');
const User = require('../models/user');

module.exports = {
    show
}

function show(req, res) {
    User.findById(req.user._id, function(err, user) {
            res.render('users/show', {
                user,
                title: `${user.name}`
            })
        })
}

// Promise.all([
//  Note.find({'user': req.user._id}),
//  Book.find({'user': req.user._id})
// ]).then( ([notes, books]) => {
//  console.log(notes);
//  console.log(books);
// })