const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const connectMysql = require('../database');
const bcrypt = require('bcryptjs');

passport.use(new LocalStrategy({
    usernameField: 'email'
}, async(email,password, done) =>{   //Apartir de esta funcion va empezar a recibir los datos
    
    await connectMysql.query("SELECT email FROM users WHERE email = ?", [email], function (err, result) {
        if (err) throw err;
        if(result == ""){
            return done(null, false, {message: 'Not User found'});  //done(null,false) el null es para retornar ningun error y false es para el usuario o email
        }else{
                connectMysql.query("SELECT * FROM users WHERE email = ?", [email], function (err, result) {
                    //Compare Encrypt passwd 
                    bcrypt.compare(password,result[0].password, function (err,result) {
                        if (result == true){
                            return done(null, email);
                        }else{
                            return done(null, false, {message: 'Incorrect Password'});
                        }
                    });
                    //End
                    
                });
            
        }
    });
}));


passport.serializeUser((email,done) =>{
    done(null, email);
});

passport.deserializeUser((email,done) =>{
    connectMysql.query("SELECT email FROM users WHERE email = ?", [email], function (err, result) {
        done(err,result);
    });
});