const helpers = {};

helpers.isAuthenticated = (req,res,next) =>{
    if(req.isAuthenticated()){
        return next();
    }
    req.flash('error_msg', 'Not Autholizated');
    res.redirect('/users/session/signin');
}

module.exports = helpers;