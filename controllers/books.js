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
    delete: deleteBook
}

function index (req, res) {
    if (req.query.q) {
        const key = process.env.API_KEY
        request(`https://www.googleapis.com/books/v1/volumes?q=${req.query.q}+intitle:${req.query.q}&key=${key}`,
        function(err, response, body) {
            const searchResults = JSON.parse(body);
            const results = searchResults.items;
            //console.log(searchResults)
            //console.log(searchResults.items[0].volumeInfo)
            // console.log(searchResults.items[0].saleInfo)
            // console.log('sale info')
            // console.log(searchResults.items[0].accessInfo)
            // console.log('access info')
            // console.log(searchResults.items[0].searchInfo)
            // console.log('search info')
            // console.log(results[0].volumeInfo.imageLinks.thumbnail)
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
    // console.log(req.query);
    // console.log('this is req.query in newBook function');
    const book = req.query;
    res.render('books/new', {
        title: 'Add Book',
        book
    })
}

function create(req, res) {
    // console.log(req.body)
    // console.log('this is req.body in create function')
    const book = new Book(req.body);
    book.save(function (err) {
        if (err) return res.redirect('/books/new');
        res.redirect('/books'); //change to show the book's details page?
    })
}

function allBooks(req, res) {
    Book.find({}, function(err, books) {
        res.render('books/all', {
            title: 'My Shelf',
            books
        })
    })
}

function show(req, res){
    Book.findById(req.params.id, function(err, book) {
        res.render('books/show', {
            title: book.title,
            book
        })
    })
}

function deleteBook(req, res) {
    Book.findByIdAndDelete(req.params.id, function(err) {
        res.redirect('/books/all')
    })
}