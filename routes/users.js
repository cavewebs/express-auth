var express = require('express');
var router = express.Router();
var passport = require('passport');

const userCtrl = require('../controllers/user.controllers')

router.post('/login', userCtrl.login);

router.post('/register', userCtrl.register);

router.post('/profile', passport.authenticate('local', { session: false }), userCtrl.profile);

module.exports = router;
