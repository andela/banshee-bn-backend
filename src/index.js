import express from 'express';
import dotenv from 'dotenv';
import passport from 'passport';
import bodyParser from 'body-parser';
import cors from 'cors';
import db from './config/index';
import session from 'express-session';

// Create global app object
const app = express();

app.use(cors());

// Normal express config defaults
//app.use(require("morgan")("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(require('method-override')());
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.send('Welcome to Barefoot Nomad');
});

app.use(
  session({
    secret: 'authorshaven',
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false
  })
);

//app.use(require('./routes'));

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/// error handlers

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    errors: {
      message: err.message,
      error: {}
    }
  });
});

// finally, let's start our server...
const server = app.listen(process.env.PORT || 3000, function() {
  console.log('Listening on port ' + server.address().port);
});
