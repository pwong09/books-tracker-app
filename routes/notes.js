const express = require('express');
const router = express.Router();
const notesCtrl = require('../controllers/notes');
const isLoggedIn = require('../config/auth');

router.post('/books/:id/notes', isLoggedIn, notesCtrl.create);
router.delete('/notes/:id', isLoggedIn, notesCtrl.delete);
router.put('/notes/:id', isLoggedIn, notesCtrl.update);

module.exports = router;