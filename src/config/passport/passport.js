import passport from 'passport';
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import PassportHelper from '../../helpers/PassportHelper';

passport.serializeUser((user, done) => {
  done(null, user);
});

const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/api/v1/auth/google/redirect'
  },
  PassportHelper.verifyCallback
);

const facebookStrategy = new FacebookStrategy(
  {
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: '/api/v1/auth/facebook/redirect',
    profileFields: ['id', 'emails', 'name']
  },
  PassportHelper.verifyCallback
);

export { googleStrategy, facebookStrategy };
