"use strict";

var router = require('express').Router();

var connectMysql = require('../database');

var uuid = require('uuid/v4');

var _require = require('fs-extra'),
    unlink = _require.unlink;

var path = require('path');

var _require2 = require('../helpers/auth'),
    isAuthenticated = _require2.isAuthenticated;

router.get('/product', function _callee(req, res) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(connectMysql.query('SELECT * FROM products', function (error, products_result) {
            if (error) throw error;
            res.render('product/show', {
              products_result: products_result
            });
          }));

        case 2:
        case "end":
          return _context.stop();
      }
    }
  });
});
router.get('/product/type1', function _callee2(req, res) {
  var type1;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          type1 = "jyAs";
          _context2.next = 3;
          return regeneratorRuntime.awrap(connectMysql.query('SELECT * FROM products WHERE category_id = ?', [type1], function (error, products_result) {
            if (error) throw error;
            res.render('product/show', {
              products_result: products_result
            });
          }));

        case 3:
        case "end":
          return _context2.stop();
      }
    }
  });
});
router.get('/product/type2', function _callee3(req, res) {
  var type1;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          type1 = "cgSs";
          _context3.next = 3;
          return regeneratorRuntime.awrap(connectMysql.query('SELECT * FROM products WHERE category_id = ?', [type1], function (error, products_result) {
            if (error) throw error;
            res.render('product/show', {
              products_result: products_result
            });
          }));

        case 3:
        case "end":
          return _context3.stop();
      }
    }
  });
});
router.get('/product/type3', function _callee4(req, res) {
  var type1;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          type1 = "heLg";
          _context4.next = 3;
          return regeneratorRuntime.awrap(connectMysql.query('SELECT * FROM products WHERE category_id = ?', [type1], function (error, products_result) {
            if (error) throw error;
            res.render('product/show', {
              products_result: products_result
            });
          }));

        case 3:
        case "end":
          return _context4.stop();
      }
    }
  });
});
router.get('/product/type4', function _callee5(req, res) {
  var type1;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          type1 = "wgPy";
          _context5.next = 3;
          return regeneratorRuntime.awrap(connectMysql.query('SELECT * FROM products WHERE category_id = ?', [type1], function (error, products_result) {
            if (error) throw error;
            res.render('product/show', {
              products_result: products_result
            });
          }));

        case 3:
        case "end":
          return _context5.stop();
      }
    }
  });
});
router.get('/product/type5', function _callee6(req, res) {
  var type1;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          type1 = "tsEt";
          _context6.next = 3;
          return regeneratorRuntime.awrap(connectMysql.query('SELECT * FROM products WHERE category_id = ?', [type1], function (error, products_result) {
            if (error) throw error;
            res.render('product/show', {
              products_result: products_result
            });
          }));

        case 3:
        case "end":
          return _context6.stop();
      }
    }
  });
});
router.get('/product/type6', function _callee7(req, res) {
  var type1;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          type1 = "atCs";
          _context7.next = 3;
          return regeneratorRuntime.awrap(connectMysql.query('SELECT * FROM products WHERE category_id = ?', [type1], function (error, products_result) {
            if (error) throw error;
            res.render('product/show', {
              products_result: products_result
            });
          }));

        case 3:
        case "end":
          return _context7.stop();
      }
    }
  });
});
router.get('/product/type7', function _callee8(req, res) {
  var type1;
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          type1 = "ctSsTs";
          _context8.next = 3;
          return regeneratorRuntime.awrap(connectMysql.query('SELECT * FROM products WHERE category_id = ?', [type1], function (error, products_result) {
            if (error) throw error;
            res.render('product/show', {
              products_result: products_result
            });
          }));

        case 3:
        case "end":
          return _context8.stop();
      }
    }
  });
});
router.get('/product/type8', function _callee9(req, res) {
  var type1;
  return regeneratorRuntime.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          type1 = "ve";
          _context9.next = 3;
          return regeneratorRuntime.awrap(connectMysql.query('SELECT * FROM products WHERE category_id = ?', [type1], function (error, products_result) {
            if (error) throw error;
            res.render('product/show', {
              products_result: products_result
            });
          }));

        case 3:
        case "end":
          return _context9.stop();
      }
    }
  });
});
router.get('/product/upload', isAuthenticated, function _callee10(req, res) {
  return regeneratorRuntime.async(function _callee10$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.next = 2;
          return regeneratorRuntime.awrap(connectMysql.query('SELECT * FROM category', function (error, category) {
            if (error) throw error;
            console.log(category);
            res.render('product/upload', {
              category: category
            });
          }));

        case 2:
        case "end":
          return _context10.stop();
      }
    }
  });
});
router.post('/product/upload', isAuthenticated, function _callee11(req, res) {
  var _req$body, title, price, category, description, _req$file, filename, path, mimetype, email, errors;

  return regeneratorRuntime.async(function _callee11$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          _req$body = req.body, title = _req$body.title, price = _req$body.price, category = _req$body.category, description = _req$body.description;
          _req$file = req.file, filename = _req$file.filename, path = _req$file.path, mimetype = _req$file.mimetype;
          email = req.user;
          errors = [];

          if (title.length <= 0) {
            errors.push({
              text: "The title should not be empty"
            });
          }

          if (price.length <= 0) {
            errors.push({
              text: "The price should not be empty"
            });
          }

          if (category == "Choose...") {
            errors.push({
              text: "The category should not be empty"
            });
          }

          if (description.length <= 0) {
            errors.push({
              text: "The description should not be empty"
            });
          }

          if (!(errors.length > 0)) {
            _context11.next = 12;
            break;
          }

          res.render('product/upload', {
            errors: errors,
            title: title,
            price: price,
            category: category,
            description: description
          });
          _context11.next = 14;
          break;

        case 12:
          _context11.next = 14;
          return regeneratorRuntime.awrap(connectMysql.query('SELECT id FROM category WHERE name = ?', [category], function (error, result) {
            if (error) throw error;
            var product_data = {
              id: uuid(),
              title: title,
              price: price,
              category_id: result[0].id,
              seller: email[0].email,
              description: description,
              path: '/img/uploads/' + req.file.filename
            };
            connectMysql.query('INSERT INTO products SET ?', [product_data], function (error, result) {
              if (error) throw error;
              var image_data = {
                id: uuid(),
                filename: filename,
                path: path,
                extname: mimetype,
                product_id: product_data.id
              };
              connectMysql.query('INSERT INTO image SET ?', [image_data], function (error, result) {
                if (error) throw error;
                req.flash('success_msg', 'Product added success');
                res.redirect('/product');
              });
            });
          }));

        case 14:
        case "end":
          return _context11.stop();
      }
    }
  });
});
router.get('/product/edit/:id', isAuthenticated, function _callee12(req, res) {
  return regeneratorRuntime.async(function _callee12$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          _context12.next = 2;
          return regeneratorRuntime.awrap(connectMysql.query('SELECT * FROM products WHERE id = ?', [req.params.id], function (error, products_result) {
            if (error) throw error;
            connectMysql.query('SELECT * FROM category', function (error, category) {
              if (error) throw error;
              console.log(products_result);
              res.render('product/edit', {
                products_result: products_result,
                category: category
              });
            });
          }));

        case 2:
        case "end":
          return _context12.stop();
      }
    }
  });
});
router.post('/product/edit-product/:id', isAuthenticated, function _callee13(req, res) {
  var _req$body2, id, title, price, category, description, _req$file2, filename, mimetype, errors;

  return regeneratorRuntime.async(function _callee13$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          _req$body2 = req.body, id = _req$body2.id, title = _req$body2.title, price = _req$body2.price, category = _req$body2.category, description = _req$body2.description;
          _req$file2 = req.file, filename = _req$file2.filename, mimetype = _req$file2.mimetype;
          errors = []; //backcall is missing

          _context13.next = 5;
          return regeneratorRuntime.awrap(connectMysql.query('SELECT id FROM category WHERE name = ?', [category], function (error, category_id) {
            if (error) throw error;
            var product_data = {
              title: title,
              price: price,
              category_id: category_id[0].id,
              description: description,
              path: '/img/uploads/' + req.file.filename
            };
            connectMysql.query('UPDATE products SET ? WHERE id = ?', [product_data, id], function (error, result) {
              if (error) throw error;
              res.render('/product');
            });
          }));

        case 5:
        case "end":
          return _context13.stop();
      }
    }
  });
});
router.get('/product/:id/delete', isAuthenticated, function _callee14(req, res) {
  var id, hord;
  return regeneratorRuntime.async(function _callee14$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
          id = req.params.id;
          hord = 1;
          _context14.next = 4;
          return regeneratorRuntime.awrap(connectMysql.query('SELECT * FROM products WHERE id = ?', [id], function (error, product_result) {
            if (error) throw error;
            connectMysql.query('DELETE FROM image WHERE product_id = ?', [id], function (error, image_delete) {
              if (error) throw error;
              connectMysql.query('DELETE FROM products WHERE id = ?', [id], function (error, delete_result) {
                if (error) throw error;
                unlink(path.resolve('./src/public/' + product_result[0].path));
              });
            });
          }));

        case 4:
          res.redirect('/profile');

        case 5:
        case "end":
          return _context14.stop();
      }
    }
  });
});
router.get('/product/profile/:id', function _callee15(req, res) {
  var id;
  return regeneratorRuntime.async(function _callee15$(_context15) {
    while (1) {
      switch (_context15.prev = _context15.next) {
        case 0:
          id = req.params.id;
          _context15.next = 3;
          return regeneratorRuntime.awrap(connectMysql.query('SELECT * FROM products WHERE ID = ?', [id], function (error, products_result) {
            if (error) throw error;
            res.render('product/product_profile', {
              products_result: products_result
            });
          }));

        case 3:
        case "end":
          return _context15.stop();
      }
    }
  });
});
module.exports = router;