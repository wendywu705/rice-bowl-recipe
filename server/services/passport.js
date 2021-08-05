const passport = require('passport'); // for authentication
const mongoose = require('mongoose');
const { Strategy } = require('passport-google-oauth20'); // for authentication

const User = mongoose.model('users');
require('dotenv').config();

const config = {
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
};

// Authorization secrets and callback URL to be used to create a new passport Strategy
const AUTH_OPTIONS = {
  callbackURL: 'https://backend-cepdewy2ta-nn.a.run.app/auth/google/callback',
  clientID: config.CLIENT_ID,
  clientSecret: config.CLIENT_SECRET,
};

// Save the session to the cookie
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Read the session from the cookie
passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

const verifyCallback = async (accessToken, refreshToken, profile, done) => {
  console.log('Google accessToken', accessToken);
  console.log('Google refreshToken', refreshToken);
  console.log('Google Profile', profile);
  const existingUser = await User.findOne({ googleId: profile.id });
  if (existingUser) {
    // The user is already registered with our database, return the existing profile.
    done(null, existingUser);
    return;
  }
  const user = await new User({
    googleId: profile.id,
    createdAt: new Date(),
    email: profile.emails[0].value,
    displayName: profile.displayName,
  }).save();
  done(null, user);
};

// Create a new passport Strategy using the AUTH_OPTIONS
passport.use(new Strategy(AUTH_OPTIONS, verifyCallback));
