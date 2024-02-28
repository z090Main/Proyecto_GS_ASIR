"use strict";

var router = require('express').Router();

var connectMysql = require('../database');

var _require = require('../helpers/auth'),
    isAuthenticated = _require.isAuthenticated;

router.get('/profile', isAuthenticated, function _callee(req, res) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(connectMysql.query('SELECT * FROM users WHERE email = ?', [req.user[0].email], function (err, user_result) {
            if (err) throw err;
            connectMysql.query('SELECT * FROM products WHERE seller = ?', [user_result[0].email], function (error, products_result) {
              if (err) throw err;
              console.log('profile', user_result);
              res.render('users/items/profile', {
                user_result: user_result,
                products_result: products_result
              });
            });
          }));

        case 2:
        case "end":
          return _context.stop();
      }
    }
  });
});
module.exports = router;