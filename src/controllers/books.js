const Book = require('../models/book');
const Note = require('../models/note');
const request = require('request');

module.exports = {
    index,
    new: newBook,
    create,
    all: allBooks,
    show,
    delete: deleteBook,
    edit,
    update: updateBook
}

// index function shows search bar to find books to add to user's Shelf
function index (req, res) {
    if (req.query.q) {
        const key = process.env.API_KEY
        request(`https://www.googleapis.com/books/v1/volumes?q=${req.query.q}+${req.query.keyword}:${req.query.q}&key=${key}`,
        function(err, response, body) {
            const searchResults = JSON.parse(body);
            const results = searchResults.items;
            res.render('books/index', {
                title: 'KanShu',
                results
            });
        })
    } else {
    res.render('books/index', {
        title: 'KanShu',
        results: null
        });
    }
}

// takes form values from index to new view
function newBook(req, res) {
    const book = req.query;
    res.render('books/new', {
        title: 'Add Book',
        book
    })
}

// actually add and save the book to user's Shelf
function create(req, res) {
    req.body.user = req.user._id;
    const book = new Book(req.body);
    book.save(function (err) {
        if (err) return res.send(err);
        res.redirect(`/books/${book._id}`);
    })
}

// view all books on user's Shelf
function allBooks(req, res) {
    Book.find({'user': req.user._id}, function(err, books) {
        res.render('books/all', {
            title: 'My Shelf',
            books
        })
    })
}

// show individual book on user's Shelf
function show(req, res){
    Book.findById(req.params.id, function(err, book) {
        Note.find({'user': req.user._id, 'book': req.params.id}, function (err, notes) {
            res.render('books/show', {
                title: 'My Book',
                book,
                notes
            })
        })
    })
}

// delete individual book
function deleteBook(req, res) {
    Book.findByIdAndDelete(req.params.id, function(err) {
        res.redirect('/books/all')
    })
}

// edit individual book - takes user to an edit view
function edit(req, res) {
    Book.findById(req.params.id, function(err, book) {
        if (!book.user.equals(req.user._id)) return res.redirect('/books');
        res.render(`books/edit`, {title: 'edit book', book});
    });
}

// back-end update and save changes to book
function updateBook(req, res) {
    Book.findOne({'_id': req.params.id}, function(err, book) {
        if (!book.user.equals(req.user._id)) return res.redirect('/books/edit');
        book.recommend = req.body.recommend;
        book.save(function(err) {
            if (err) return res.send(err);
            res.redirect(`/books/${book._id}`)
        })
    })
}
 