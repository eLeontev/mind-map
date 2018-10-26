let passport = require('passport');
let { Strategy: GoogleStrategy } = require('passport-google-oauth20');
let { googleKeys } = require('../../keys');

passport.use(new GoogleStrategy({
    ...googleKeys,
    callbackURL: '/auth/google/callback',
}, (accessToken, refreshToken, profile, cb) => cb(null, profile)
));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));
