const router = require('express').Router();
const connectMysql = require('../database');
const { isAuthenticated } = require('../helpers/auth');

router.get('/profile',isAuthenticated,async(req,res) =>{
    await connectMysql.query('SELECT * FROM users WHERE email = ?',[req.user[0].email],(err,user_result) =>{
        if (err) throw err;
        connectMysql.query('SELECT * FROM products WHERE seller = ?',[user_result[0].email],(error,products_result) =>{
            if (err) throw err;
            const name = user_result[0].name;
            //console.log('profile',req.user);
            res.render('users/items/profile',{user_result,products_result,name});
        })

    });

});


module.exports = router;