var router = require('express').Router();
const passport = require('passport');
const key = process.env.API_KEY;

// The root route renders our only view
router.get('/', function(req, res) {
  // Where do you want to go for the root route
  res.redirect('/');
});

// Google OAuth login route
router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
));

// Google OAuth callback route
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect : '/books', // where do you want the client to go after you login - show all books
    failureRedirect : '/' // where do you want the client to go if login fails - root
  }
));

// OAuth logout route
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

module.exports = router;
