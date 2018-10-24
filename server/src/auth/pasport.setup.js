let passport = require('passport');
let { googleKeys } = require('./keys');
let { Strategy: GoogleStrategy } = require('passport-google-oauth20');

passport.use(new GoogleStrategy({
    ...googleKeys,
    callbackURL: "/auth/google/callback"
  }, (accessToken, refreshToken, profile, cb) => {
    return cb(null, profile);
  }
));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));
