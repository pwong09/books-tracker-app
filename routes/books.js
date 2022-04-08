var router = require('express').Router();
const isLoggedIn = require('../config/auth');
const booksCtrl = require('../controllers/books');

router.get('/', isLoggedIn, booksCtrl.index);
router.get('/new', isLoggedIn, booksCtrl.new);


module.exports = router;