"use strict";

var router = require('express').Router();

router.get('/', function (req, res) {
  res.render('index');
});
router.get('/users/session', function (req, res) {
  res.render('users/session');
});
module.exports = router;