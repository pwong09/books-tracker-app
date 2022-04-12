const Book = require('../models/book');
const User = require('../models/user');
const Note = require('../models/note');

module.exports = {
    create: createNote
}

function createNote(req, res) {
        req.body.user = req.user._id;
        const note = new Note(req.body);
        console.log(note)
        note.save(function(err) {
            if (err) return res.send(err);
            res.redirect(`/books/${req.params.id}`);
        });
}