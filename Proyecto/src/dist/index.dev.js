"use strict";

var express = require('express');

var path = require('path');

var exphbs = require('express-handlebars');

var session = require('express-session');

var morgan = require('morgan');

var flash = require('connect-flash');

var methodOverride = require('method-override');

var passport = require('passport');

var multer = require('multer');

var uuid = require('uuid/v4');

var socketIO = require('socket.io'); //Initialization 


var app = express();

require('./database');

require('./config/passport'); //Settings


app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs'
}));
app.set('view engine', '.hbs'); //Middlewares

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(methodOverride('_method'));
app.use(session({
  secret: 'mysecret',
  resave: true,
  saveUninitialized: true
}));
var storage = multer.diskStorage({
  destination: path.join(__dirname, 'public/img/uploads'),
  filename: function filename(req, file, cb, _filename) {
    cb(null, uuid() + path.extname(file.originalname));
  } //es una funcion que va a ejecutar antes de guardar las imagenes

});
app.use(multer({
  storage: storage
}).single('image')); //Passport Config

app.use(passport.initialize());
app.use(passport.session());
app.use(flash()); //Global variables

app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
}); //Routes

app.use(require('./routes/index'));
app.use(require('./routes/users'));
app.use(require('./routes/profile'));
app.use(require('./routes/product')); //Static files

app.use(express["static"](path.join(__dirname, 'public'))); //Starting server

var server = app.listen(app.get('port'), function () {
  console.log('Server on port', app.get('port'));
}); //configuration WebSockets

var io = socketIO(server); //requiere un servidor ya iniciado
//Web sockets

io.on('connection', function (socket) {
  console.log('New Connection', socket.id); //procesar los datos que recibe desde del parte cliente

  socket.on('chat:message', function (data) {
    //Recibir los datos y reenvia a los usuario incluyendo el mismo.
    io.sockets.emit('chat:message', data);
  });
  socket.on('chat:typing', function (data) {
    //reenviar a todos excepto el emisor
    socket.broadcast.emit('chat:typing', data);
  });
});