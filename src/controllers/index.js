const request = require('request');

module.exports = {
    index
}

function index (req, res) {
    if (req.query.q) {
        const key = process.env.API_KEY
        request(`https://www.googleapis.com/books/v1/volumes?q=${req.query.q}+${req.query.keyword}:${req.query.q}&key=${key}`,
        function(err, response, body) {
            const searchResults = JSON.parse(body);
            const results = searchResults.items;
            res.render('index', {
                title: 'KanShu',
                results
            });
        })
    } else {
    res.render('index', {
        title: 'KanShu',
        results: null
        });
    }
}