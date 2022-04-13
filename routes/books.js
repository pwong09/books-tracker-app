var router = require('express').Router();
const isLoggedIn = require('../config/auth');
const booksCtrl = require('../controllers/books');

router.get('/', isLoggedIn, booksCtrl.index);
router.get('/new', isLoggedIn, booksCtrl.new);
router.post('/', isLoggedIn, booksCtrl.create);

router.get('/all', isLoggedIn, booksCtrl.all)
router.get('/:id', isLoggedIn, booksCtrl.show);

router.get('/:id/edit', booksCtrl.edit);
router.put('/:id', booksCtrl.update);

router.delete('/:id', isLoggedIn, booksCtrl.delete);

module.exports = router;