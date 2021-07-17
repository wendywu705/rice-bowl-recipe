const passport = require('passport'); // for authentication
const mongoose = require('mongoose');
const { Strategy } = require('passport-google-oauth20'); // for authentication

const User = mongoose.model('users');
require('dotenv').config();

const config = {
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
  COOKIE_KEY_1: process.env.COOKIE_KEY_1,
  COOKIE_KEY_2: process.env.COOKIE_KEY_2,
};

// Authorization secrets and callback URL to be used to create a new passport Strategy
const AUTH_OPTIONS = {
  callbackURL: '/auth/google/callback',
  clientID: config.CLIENT_ID,
  clientSecret: config.CLIENT_SECRET,
};

const verifyCallback = async (accessToken, refreshToken, profile, done) => {
  console.log('Google Profile', profile);
  const existingUser = await User.findOne({ googleId: profile.id });
  if (existingUser) {
    // The user is already registered with our database, return the existing profile.
    done(null, existingUser);
  }
  const user = await new User({
    googleId: profile.id,
    createdAt: new Date(),
  }).save();
  done(null, user);
};

// Create a new passport Strategy using the AUTH_OPTIONS
passport.use(new Strategy(AUTH_OPTIONS, verifyCallback));

// Save the session to the cookie
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Read the session from the cookie
passport.deserializeUser((id, done) => {
  done(null, id);
});
