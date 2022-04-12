var router = require('express').Router();
const isLoggedIn = require('../config/auth');
const reviewsCtrl = require('../controllers/reviews');

router.post('/books/:id/reviews', isLoggedIn, reviewsCtrl.create);
router.delete('/reviews/:id', isLoggedIn, reviewsCtrl.delete);
router.put('/reviews/:id', isLoggedIn, reviewsCtrl.update);

module.exports = router;