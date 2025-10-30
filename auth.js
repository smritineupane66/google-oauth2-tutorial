import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import 'dotenv/config';
import User from './models/User.js';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

passport.use(new GoogleStrategy({
    clientID:     GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/google/callback",
    passReqToCallback   : true
  },

  async function(request, accessToken, refreshToken, profile, done) {
      try {
          // Check if user exists
          let user = await User.findOne({ googleId: profile.id });
          
          if (user) {
              // Update last login
              user.lastLogin = new Date();
              await user.save();
              return done(null, user);
          } else {
              // Create new user
              user = await User.create({
                  googleId: profile.id,
                  email: profile.emails[0].value,
                  name: profile.displayName,
                  profilePicture: profile.photos[0].value
              });
              return done(null, user);
          }
      } catch (error) {
          return done(error, null);
      }
  }
));

// Store only user ID in session
passport.serializeUser(function(user, done){
    done(null, user._id);
})

// Get user from database using ID
passport.deserializeUser(async function(id, done){
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
})