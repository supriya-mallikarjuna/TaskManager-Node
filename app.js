var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { Sequelize } = require('sequelize');
const db = require('./models');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use('/static', express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter);
app.use('/users', usersRouter);


 
  console.log('Host:', process.env.PG_HOST);
  console.log('Port:', process.env.PG_PORT);
  console.log('User:', process.env.PG_USER);
  console.log('Password:', process.env.PG_PASSWORD);
  console.log('Database:', process.env.PG_DATABASE);
const sequelize = new Sequelize({
    dialect: 'postgres',
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    username: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
  });
  

  // Test the connection to PostgreSQL
sequelize
.authenticate()
.then(() => console.log('Connected to PostgreSQL successfully'))
.catch((err) => console.error('Unable to connect to PostgreSQL:', err));

db.sequelize
  .sync()
  .then(() => console.log('Database synchronized with force'))
  .catch((err) => console.error('Error synchronizing database:', err));



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
