const Note = require('../models/note');

module.exports = {
    create: createNote,
    delete: deleteNote,
    update: updateNote
}

function createNote(req, res) {
        req.body.user = req.user._id;
        const note = new Note(req.body);
        note.save(function(err) {
            if (err) return res.send(err);
            res.redirect(`/books/${req.params.id}`);
        });
}

function deleteNote(req, res) {
    Note.findOneAndDelete(req.params.id, function(err, note) {
        if (!note.user.equals(req.user._id)) return res.redirect(`/books/${note.book._id}`);
        res.redirect(`/books/${note.book._id}`);
    });
}

function updateNote(req, res){
    Note.findById(req.params.id).then(function(note) {
        if (!note.user.equals(req.user._id)) return res.redirect(`/books/${note.book._id}`);
        note.text = req.body.text;
        note.save().then(function() {
            res.redirect(`/books/${note.book._id}`);
        }).catch(function(err) {
            return next(err);
        });
    });
}