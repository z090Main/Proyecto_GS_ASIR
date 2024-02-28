const router = require('express').Router();

const { isAuthenticated } = require('../helpers/auth');

router.get('/profile',isAuthenticated,(req,res) =>{
    res.render('users/items/profile')
});


module.exports = router;