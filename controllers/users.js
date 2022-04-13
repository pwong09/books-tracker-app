const Book = require('../models/book');
const Note = require('../models/note');
const User = require('../models/user');

module.exports = {
    show,
    delete: deleteUser
}

function show(req, res) {
    User.findById(req.user._id, function(err, user) {
    Promise.all([
        Note.find({'user': req.user._id}),
        Book.find({'user': req.user._id})
        ]).then( ([notes, books]) => {
            console.log(notes);
            console.log(books);
            res.render('users/show', {
                user,
                notes,
                books,
                title: `${user.name}`
            })
        })
    })
}

function deleteUser(req, res) {
    User.findByIdAndDelete(req.user._id, function(err) {
        res.redirect('/')
    })
}