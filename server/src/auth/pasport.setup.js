let passport = require('passport');
let { google } = require('./keys');
let GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    ...google,
    callbackURL: "/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
      return cb(null, 'asd');
  }
));