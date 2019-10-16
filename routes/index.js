const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');

router.get('/me', passport.authenticate('jwt', {session: false}), function(req, res, next) {
  res.json(req.user);
});

module.exports = router;
