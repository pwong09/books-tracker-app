var router = require('express').Router();
const isLoggedIn = require('../config/auth');
const reviewsCtrl = require('../controllers/reviews');

router.post('/books/:id/reviews', isLoggedIn, reviewsCtrl.create);
router.delete('/reviews/:id', isLoggedIn, reviewsCtrl.delete);

module.exports = router;