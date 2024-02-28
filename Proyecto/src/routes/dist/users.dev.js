"use strict";

var router = require('express').Router();

var connectMysql = require('../database');

var bcrypt = require('bcrypt');

var _require = require('.'),
    route = _require.route;

var uuid = require('uuid/v4');

var passport = require('passport');

router.get('/users/session/signup', function (req, res) {
  res.render('users/signup');
});
router.post('/session/signup', function _callee(req, res) {
  var _req$body, name, email, password, confirm_password, phone, address, country, errors, saltRounds;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, name = _req$body.name, email = _req$body.email, password = _req$body.password, confirm_password = _req$body.confirm_password, phone = _req$body.phone, address = _req$body.address, country = _req$body.country;
          errors = [];
          saltRounds = 10;

          if (password != confirm_password) {
            errors.push({
              text: 'Password do not match'
            });
          }

          if (password.length < 4) {
            errors.push({
              text: 'Password must be at leats 4 characters'
            });
          }

          if (!(errors.length > 0)) {
            _context.next = 9;
            break;
          }

          res.render('users/signup', {
            errors: errors,
            name: name,
            email: email,
            password: password,
            confirm_password: confirm_password,
            phone: phone,
            address: address,
            country: country
          });
          _context.next = 11;
          break;

        case 9:
          _context.next = 11;
          return regeneratorRuntime.awrap(connectMysql.query("SELECT email FROM users WHERE email = ?", [email], function (err, result) {
            if (err) throw err;

            if (result != "") {
              req.flash('error_msg', 'The Email is already in use'); //Bug

              res.redirect('/users/session/signup');
            } else {
              //need crypt password
              var post = {
                id: uuid(),
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                phone: req.body.phone,
                address: req.body.address,
                country: req.body.country
              };
              console.log(post); //** */

              connectMysql.query("INSERT INTO users set ?", [post], function (err, result) {
                if (err) throw err;
                console.log(result);
              });
              req.flash('success_msg', 'You are registered');
              res.redirect('/users/session/signin');
            }
          }));

        case 11:
        case "end":
          return _context.stop();
      }
    }
  });
});
router.get('/users/session/signin', function (req, res) {
  res.render('users/signin');
});
router.post('/users/session/signin', passport.authenticate('local', {
  successRedirect: '/profile',
  failureRedirect: '/users/session/signin',
  failureFlash: true
}));
router.get('/users/session/logout', function (req, res) {
  req.logOut();
  res.redirect('/');
});
module.exports = router;