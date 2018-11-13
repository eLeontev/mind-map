let passport = require('passport');
let { Strategy: GoogleStrategy } = require('passport-google-oauth20');
let {
    googleKeys: {
        clientID,
        clientSecret,
    }
} = require('../../keys');

let {
    env: {
        GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET,
    }
} = process;

let googleKeys = {
    clientID: clientID || GOOGLE_CLIENT_ID,
    clientSecret: clientSecret || GOOGLE_CLIENT_SECRET,
};

passport.use(new GoogleStrategy({
    ...googleKeys,
    callbackURL: '/auth/google/callback',
}, (accessToken, refreshToken, profile, cb) => cb(null, profile)
));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));
