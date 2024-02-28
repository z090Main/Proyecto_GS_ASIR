const router = require('express').Router();

router.get('/',(req,res) =>{
    res.render('index');
});

router.get('/users/session',(req,res) =>{
    res.render('users/session');
});

module.exports = router;