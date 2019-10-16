const express = require('express');
const router = express.Router();
const UserModel = require('../models/user');
const mongoose = require('mongoose');
const constant = require('../utils/constant');

const jwt = require('jsonwebtoken');
const passport = require('passport');

router.post('/login', (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        // console.log(err);
        if (err || !user) {
            return res.status(400).json({
                message: info ? info.message : 'Đăng nhập thất bại',
                user: user
            });
        }
        req.login(user, { session: false }, (err) => {
            if (err) {
                res.send(err);
            }
            const token = jwt.sign(user.toJSON() , constant.JWT_SECRET , { expiresIn: '180s'});
            return res.json({ user, token });
        });
    })(req, res);

});

router.post('/register', (req, res) => {
  const user = new UserModel({
    _id: new mongoose.Types.ObjectId(),
    username: req.body.username,
    password: req.body.password
  })
  
  user.save()
    .then( result => {
      console.log(result);
      res.send(result);
    })
    .catch( err => console.log(err));

})

module.exports = router;
