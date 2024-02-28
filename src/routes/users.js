const router = require('express').Router();
const connectMysql = require('../database');
const bcrypt = require('bcrypt');
const { route } = require('.');

const passport = require('passport');

router.get('/users/session/signup', (req, res) => {
    res.render('users/signup')
});

router.post('/session/signup', async (req, res) => {
    const { name, email, password, confirm_password } = req.body;
    const errors = [];
    const saltRounds = 10;

    if (password != confirm_password) {
        errors.push({ text: 'Password do not match' });
    }
    if (password.length < 4) {
        errors.push({ text: 'Password must be at leats 4 characters' });
    }

    if (errors.length > 0) {
        res.render('users/signup', { errors, name, email, password, confirm_password });
    } else {
        await connectMysql.query("SELECT email FROM users WHERE email = ?", [email], function (err, result) {
            if (err) throw err;
            if (result != "") {
                req.flash('error_msg', 'The Email is already in use');  //Bug
                res.redirect('/users/session/signup');
            }else{
                //need crypt password
                    var post = { name: req.body.name, email: req.body.email, password: req.body.password };
                    console.log(post);  //** */
                    connectMysql.query("INSERT INTO users set ?", [post], function (err, result) {
                        if (err) throw err;
                        console.log(result);
                    });
                    req.flash('success_msg', 'You are registered');
                    res.redirect('/users/session/signin');
                
            }
        });

    }
});


router.get('/users/session/signin', (req, res) => {
    res.render('users/signin')
});

router.post('/users/session/signin', passport.authenticate('local', {
    successRedirect:    '/profile',
    failureRedirect:    '/users/session/signin',
    failureFlash: true
}));

router.get('/users/session/logout', (req,res) =>{
    req.logOut();
    res.redirect('/');
})

module.exports = router;