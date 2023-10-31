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

app.get('/', (req, res) => {
  res.render('inicioOrden'); // Para Probar la pagina inicioOrdemn
});
app.get('/actualizar-orden', (req, res) => {
 const ok = true;
  res.render('inicioOrden',{ok}); 
});

app.get('/formulario', (req, res) => {
 console.log("holaa") ;
 const k=true;
res.render('inicioOrden',{k,ok:true})

}); 

//app.use('', require('./routes/login'));

app.use('/users', require('./routes/users'));
app.use('/pacientes',require('./routes/pacientes'));
app.use('/admins',require('./routes/admins'));
app.use('/administradorDB',require('./routes/administradorDB'));// crea un usuario con su respectivo rol
app.use('/examenes',require('./routes/examenes'));//devuelve Examenes
app.use('/orden',require('./routes/orden'));// crea una orden
//app.use('/muestra',require('./routes/muestra'));// une orden con muestra
app.use('/examenordenes',require('./routes/examenordenes'));// Ingresa un Examen  y Unda Orden a Examen Orden tambien crea la muestra 
app.use('/determinaciones',require('./routes/determinaciones')); //aca esta el post y el get de Determinacion
app.use('/valorReferencia',require('./routes/valorreferencia'));
app.use('/vistaTecBioq',require('./routes/vistaTecBioq'));
app.use('/vistaAdmin',require('./routes/vistaAdmin'));

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
  console.log(err)
  res.status(err.status || 500);
  res.render('error',{err:JSON.stringify(err)});
});

module.exports = app;
