const Book = require('../models/book');
const Note = require('../models/note');
const User = require('../models/user');
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

function index (req, res) {
    if (req.query.q) {
        const key = process.env.API_KEY
        request(`https://www.googleapis.com/books/v1/volumes?q=${req.query.q}+intitle:${req.query.q}&key=${key}`,
        function(err, response, body) {
            const searchResults = JSON.parse(body);
            const results = searchResults.items;
            res.render('books/index', {
                title: 'Search Books',
                results
            });
        })
    } else {
    res.render('books/index', {
        title: 'PW',
        results: null
        });
    }
}

function newBook(req, res) {
    const book = req.query;
    res.render('books/new', {
        title: 'Add Book',
        book
    })
}

function create(req, res) {
    req.body.user = req.user._id;
    const book = new Book(req.body);
    book.save(function (err) {
        if (err) return res.redirect('/books/new');
        res.redirect(`/books/${book._id}`);
    })
}

function allBooks(req, res) {
    Book.find({'user': req.user._id}, function(err, books) {
        res.render('books/all', {
            title: 'My Shelf',
            books
        })
    })
}

function show(req, res){
    Book.findById(req.params.id, function(err, book) {
        res.render('books/show', {
            title: 'My Book',
            book
        })
    })
}

function deleteBook(req, res) {
    Book.findByIdAndDelete(req.params.id, function(err) {
        res.redirect('/books/all')
    })
}

function edit(req, res) {
    Book.findById(req.params.id, function(err, book) {
        if (!book.user.equals(req.user._id)) return res.redirect('/books');
        res.render(`books/edit`, {title: 'edit book', book});
    });
}

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

// retrieves a specific Bookshelf resource for specified user
// HTTP Request URL
// https://www.googleapis.com/books/v1/users/userId/bookshelves/shelf

// https://books.google.com/books?hl=en&as_coll=0&num=10&uid=11122233344455566778&source=gbs_slider_cls_metadata_0_mylibrary

// my user id?
// uid=109111253931517415981

// bookshelf id
// as_coll=4
