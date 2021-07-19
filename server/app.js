const fs = require('fs');
const path = require('path');
const https = require('https'); // for serving SSL/HTTPS (placeholder until replaced by nginx)
const helmet = require('helmet'); // for application security
const logger = require('morgan');
const express = require('express');
const passport = require('passport'); // for authentication
const cookieSession = require('cookie-session');
const mongoose = require('mongoose');
const recipeRouter = require('./routes/router.recipe');
const userRouter = require('./routes/router.user');
const cookieParser = require('cookie-parser');
const fetchRouter = require('./routes/fetch.recipe');

require('dotenv').config();
require('./models/User');
require('./services/passport');

const config = {
  COOKIE_KEY_1: process.env.COOKIE_KEY_1,
  COOKIE_KEY_2: process.env.COOKIE_KEY_2,
};

const PORT = process.env.PORT || 9000;
const app = express();

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.hoifr.mongodb.net/recipes?retryWrites=true&w=majority`;
mongoose.connect(uri, {
  useNewUrlParser: true,
  connectTimeoutMS: 5000,
  useUnifiedTopology: true,
});

// For security
app.use(helmet());

// For development logging
app.use(logger('dev'));
app.use(
  cookieSession({
    name: 'session',
    maxAge: 24 * 60 * 60 * 1000, // 24 hour session
    keys: [config.COOKIE_KEY_1, config.COOKIE_KEY_2],
  })
);

app.use(passport.initialize());
app.use(passport.session());

// This function checks that the user is Authenticated
// If the user is not authenticated, an error page will be rendered.
// Otherwise, it will call next() so that the user can access the restricted API route.
const checkAuth = (req, res, next) => {
  console.log('Current user is:', req.user);
  const isLoggedIn = req.isAuthenticated() && req.user;
  if (!isLoggedIn) {
    return res.status(401).json({
      error: 'You must be logged in!',
    });
  }
  next();
};

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Connect to the fron-end recipe list home page.
app.use('/home', fetchRouter);

app.use('/recipes', recipeRouter);
app.use('/user', userRouter);

// Self-signed OpenSSL digitial certification for SSL/TLS/https connections
// Note that this will be replaced with app.listen(), and SSL/TLS will be handled by Nginx
// once the application is fully deployed on the Google Cloud VM
https
  .createServer(
    {
      key: fs.readFileSync('key.pem'),
      cert: fs.readFileSync('cert.pem'),
    },
    app
  )
  .listen(PORT, () => {
    console.log(`[Server]: Listening on port: ${PORT}`);
  });
