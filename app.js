require('dotenv').config();
var createError = require('http-errors');
const session = require('express-session');
var express = require('express');
const mysql =require( 'mysql2');
const methodOverride =require( 'method-override');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(
  session({
    secret: 'PrrTutuPrrTutu',
    resave: false,
    saveUninitialized: true,
  })
);


app.use('', require('./routes/login'));
app.use('/users', require('./routes/users'));
app.use('/pacientes',require('./routes/pacientes'));
app.use('/admins',require('./routes/admins'));
app.use('/administradorDB',require('./routes/administradorDB'));
app.use('/orden',require('./routes/orden'));

//app.use('/orden',require('./routes/orden')); OTRA RUTA PARA CREAR ORDEN

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
