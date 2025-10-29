import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import 'dotenv/config';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

passport.use(new GoogleStrategy({
    clientID:     GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.NODE_ENV === 'production' 
        ? "https://google-oauth2-tutorial-production.up.railway.app/google/callback"
        : "http://localhost:5000/google/callback",
    passReqToCallback   : true
  },

  function(request, accessToken, refreshToken, profile, done) {
      return done(null, profile);
  }
));

// store user in session 
passport.serializeUser(function(user,done){
    done(null,user);
})

// get suer in session 
passport.deserializeUser(function(user,done){
    done(null,user);
})