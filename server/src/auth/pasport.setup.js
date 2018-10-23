let passport = require('passport');
let { google } = require('./keys');
let GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    ...google,
    callbackURL: "/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    return cb(null, profile);
  }
));

passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });