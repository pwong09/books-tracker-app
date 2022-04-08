const Book = require('../models/book');
const Note = require('../models/note');
const User = require('../models/user');
const request = require('request');

module.exports = {
    index,
    new: newBook
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

function newBook (req, res) {
    console.log(req.query.id);
    request(`https://www.googleapis.com/books/v1/volumes/${req.query.id}`,
    function (err, response, body) {
        const volume = JSON.parse(body);
        console.log(volume)
        res.render('books/new', {
            title: 'Add Book',
            book: volume.volumeInfo
        })
    })
}