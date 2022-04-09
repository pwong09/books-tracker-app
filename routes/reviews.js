var router = require('express').Router();
const isLoggedIn = require('../config/auth');
const reviewsCtrl = require('../controllers/reviews');

router.post('/books/:id/reviews', isLoggedIn, reviewsCtrl.create);

module.exports = router;