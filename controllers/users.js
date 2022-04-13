const Book = require('../models/book');
const Note = require('../models/note');
const User = require('../models/user');

module.exports = {
    show
}

function show(req, res) {
    User.findById(req.user._id, function(err, user) {
        console.log(user)
            res.render('users/show', {
                user,
                title: `${user.name}`
            })
        })
}