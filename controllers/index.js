// require('dotenv');

const request = require('request');

module.exports = {
    index
}

function index (req, res) {
    if (req.query.q) {
        const key = process.env.API_KEY
        request(`https://www.googleapis.com/books/v1/volumes?q=${req.query.q}+intitle:${req.query.q}&key=${key}`,
        function(err, response, body) {
            const searchResults = JSON.parse(body);
            const results = searchResults.items;
            res.render('index', {
                title: 'Search Books',
                results
            });
        })
    } else {
    res.render('index', {
        title: 'PW',
        results: null
        });
    }
}

// breaking down google API call for GET
// searching for Daniel Keyes' "Flowers for Algernon":
// https://www.googleapis.com/books/v1/
// volumes?q=flowers+inauthor:keyes&
// just volumes?q=flowers+intitle:flowers& // will this return any title containing flowers?
// key=yourAPIKey // put in ${key} for yourAPIKey