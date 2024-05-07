var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { Sequelize } = require('sequelize');
const db = require('./models');
const cors = require('cors'); 


const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const listRoutes = require('./routes/list'); // The route fi
const taskRoutes = require('./routes/task'); // The route fi


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
    cors({
      origin: 'http://localhost:4200',  // Allow a specific origin
      methods: ['GET', 'POST'],  // Allow specific HTTP methods
      allowedHeaders: ['Content-Type', 'Authorization'],  // Allow specific headers
    })
  );


app.use('/static', express.static(path.join(__dirname, 'public')))
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/list', listRoutes);
app.use('/task', taskRoutes);




  // Test the connection to PostgreSQL

  (async () => {
    try {
      await db.sequelize.authenticate(); // Verify the database connection
      await db.sequelize.sync({ force: true }); // Sync all models (use with caution)
      console.log('Database synchronized successfully');
    } catch (error) {
      console.error('Error synchronizing database:', error);
    }
  })();
  

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
