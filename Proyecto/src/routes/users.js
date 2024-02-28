const router = require('express').Router();
const connectMysql = require('../database');
const bcrypt = require('bcryptjs');
const { route } = require('.');
const uuid = require('uuid/v4');
const { isAuthenticated } = require('../helpers/auth');

const passport = require('passport');

//LOGGING SYSTEM
router.get('/users/session/signup', (req, res) => {
    res.render('users/signup')
});

router.post('/session/signup', async (req, res) => {
    const { name, email, password, confirm_password, phone, address, country } = req.body;
    const errors = [];
    const saltRounds = await bcrypt.genSalt(10);
    const passwdCrypt = await bcrypt.hash(password,saltRounds);
    const confirm_passwdCrypt = await bcrypt.hash(confirm_password,saltRounds);

    if (passwdCrypt != confirm_passwdCrypt) {
        errors.push({ text: 'Password do not match' });
    }
    if (password.length < 4) {
        errors.push({ text: 'Password must be at leats 4 characters' });
    }

    if (errors.length > 0) {
        res.render('users/signup', { errors, name, email, passwdCrypt, confirm_passwdCrypt, phone, address, country });
    } else {
        await connectMysql.query("SELECT email FROM users WHERE email = ?", [email], function (err, result) {
            if (err) throw err;
            if (result != "") {
                req.flash('error_msg', 'The Email is already in use');  //Bug
                res.redirect('/users/session/signup');
            }else{
                    var post = { id: uuid(),name: req.body.name, email: req.body.email, password: passwdCrypt, phone: req.body.phone, address: req.body.address, country: req.body.country };
                    //console.log(post);  //** */
                    connectMysql.query("INSERT INTO users set ?", [post], function (err, result) {
                        if (err) throw err;
                        //console.log(result);
                        //console.log(passwdCrypt);
                        //console.log(confirm_passwdCrypt);
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

//SHOPPING CART
    //Need try with socket
router.get('/user/shopping_cart',isAuthenticated,async(req,res) =>{
    const email = req.user[0].email;
    await connectMysql.query('SELECT * FROM products JOIN shopping_cart ON (products.id=shopping_cart.product_id) WHERE account_email = ?',[req.user[0].email],(error,result) =>{
        res.render("users/items/shopping_cart.hbs",{result,email});
        //console.log(result);
    });
});

router.post('/user/addCart',isAuthenticated,async(req,res) =>{
    const { productID,quantity } = req.body;
    /*console.log(req.user[0].email);
    console.log(productID,quantity);*/
    const infor = {account_email:req.user[0].email, product_id:productID, quantity: quantity};
    //console.log(infor);
    await connectMysql.query('SELECT * FROM shopping_cart WHERE account_email = ? AND product_id = ?',[req.user[0].email,productID],(error,products_result)=>{
        if(error) throw error;
        //console.log(products_result);
        if(products_result.length >0){
            connectMysql.query('UPDATE shopping_cart SET quantity = quantity+? WHERE account_email = ? and product_id = ?',[quantity,req.user[0].email,productID],(error,products_result1)=>{
                if(error) throw error;
            });
        
        }
        if(products_result.length <=0){
            connectMysql.query('INSERT INTO shopping_cart set ?',[infor],(error,products_result2)=>{
                if(error) throw error;
            });
        }
        res.redirect('/product/profile/'+productID);
        
    });
    
});

router.get('/user/shopping_cart/:id/delete',isAuthenticated,async(req,res) =>{
    const id = req.params.id;
    await connectMysql.query('DELETE FROM shopping_cart WHERE product_id= ?',[id],(error,product_result) =>{
        if(error) throw error;
        
    });
    req.flash('success_msg', 'Deleted');
    res.redirect('/user/shopping_cart');
});
router.post('/user/shop', isAuthenticated,async(req,res) => {
    console.log(req.body);
    res.redirect("/user/shopping_cart");
});
router.get('/users/manager',isAuthenticated,async(req,res)=>{
    await connectMysql.query('SELECT is_admin FROM users WHERE email = ?',[req.user[0].email],(error,result) =>{
        if(error) throw error;
        if (result[0].is_admin === 1) {
            connectMysql.query('SELECT * FROM users',(error,acounts) =>{
                if (error) throw error;
                res.render("users/admin.hbs",{acounts});
            });
        } else {
            res.redirect("/");
        }
    });
});
router.get('/users/manager/edit/:id',isAuthenticated,async(req,res) =>{
    await connectMysql.query('SELECT * FROM users WHERE id = ?',[req.params.id],(error,userData) =>{
        if (error) throw error;
        res.render("users/admin.hbs",{userData});
    });
});
router.post('/users/manager',isAuthenticated,async(req,res) => {
    const {name,email,address,phone,country,is_admin,is_seller} = req.body;
    var admin=0;
    var seller = 0;
    if (is_admin === "on") {
        admin = 1;
        if (is_seller === "on") {
            seller = 1;
        }
    }
    const newData = { name: name, email: email, address: address, phone: phone,country: country, is_admin: admin, is_seller: seller }
            await connectMysql.query('UPDATE users set ? WHERE email = ?',[newData,email],(error,result) => {
                if (error) throw error;
                res.redirect('/users/manager');
            });
});
router.get('/users/manager/:id/delete', isAuthenticated,async(req,res) =>{
    const id = req.params.id;
    //console.log(id);
    await connectMysql.query('DELETE FROM users WHERE id = ?',[id],(error) => {
        if (error) {
            throw error;
        } else {
            req.flash('success_msg', 'Acount deleted success');
            res.redirect("/users/manager");
        }
    });
    
});
router.post('/users/manager/search', isAuthenticated, async(req,res) => {
    const {Semail} = req.body;
    await connectMysql.query('SELECT * FROM users WHERE email = ?',[Semail],(error,result) => {
        if (error) throw error;
        res.render('users/admin.hbs',{result});
    });
});
module.exports = router;