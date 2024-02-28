const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const session = require('express-session');
const morgan = require('morgan');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const passport = require('passport');
const multer = require('multer');
const uuid = require('uuid/v4');
const socketIO = require('socket.io');

//Initialization 
const app = express();
require('./database');
require('./config/passport');


//Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    contentsDir: path.join(app.get('views'), 'product'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

//Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'mysecret',
    resave: true,
    saveUninitialized: true
}));
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/img/uploads'),
    filename:   (req,file,cb,filename) =>{
        cb(null,uuid() + path.extname(file.originalname));
    }//es una funcion que va a ejecutar antes de guardar las imagenes
})
app.use(multer({storage: storage}).single('image'));

    //Passport Config
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

//Global variables
app.use((req,res,next) =>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});

//Routes
app.use(require('./routes/index'));
app.use(require('./routes/users'));
app.use(require('./routes/profile'));
app.use(require('./routes/product'));

//Static files
app.use(express.static(path.join(__dirname, 'public')));

//Starting server
const server = app.listen(app.get('port'), () =>{
    console.log('Server on port', app.get('port'));
});

//configuration WebSockets
const io = socketIO(server); //requiere un servidor ya iniciado
require('./socket')(io);