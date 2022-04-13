var router = require('express').Router();
const isLoggedIn = require('../config/auth');
const usersCtrl = require('../controllers/users');

router.get('/:id', isLoggedIn, usersCtrl.show);

router.delete('/:id', isLoggedIn, usersCtrl.delete);

module.exports = router;