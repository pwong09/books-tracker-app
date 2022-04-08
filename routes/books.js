var router = require('express').Router();
const passport = require('passport');
const key = process.env.API_KEY;

router.get('/', function(req, res) {
    // Where do you want to go for the root route
    res.render('books/index', {
        title: 'PW'
    });
});

module.exports = router;
