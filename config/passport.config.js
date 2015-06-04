var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,

    // load the user model
    User           = require('../models/user.model'),

    // load the auth variables
    configAuth     = require('./auth.config');

module.exports     = function(passport) {

  // used to serialize the user for the session
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  // ---------------------
  // Google
  // =====================
  passport.use(new GoogleStrategy({
    clientID     : configAuth.googleAuth.clientID,
    clientSecret : configAuth.googleAuth.clientSecret,
    callbackURL  : configAuth.googleAuth.callbackURL
  },

  function(token, refreshToken, profile, done) {

    // User.findOne won't fire until we have all data back from Google
    process.nextTick(function() {
      User.findOne({ 'google.id' : profile.id }, function(err, user) {
        if(err) {
          return done(err);
        }
        if(user) {
          return done(null, user);
        } else {
          // if the user isn't in our DB, create a new user
          var newUser = new User();

          // set all the relevant info
          newUser.google.id = profile.id;
          newUser.google.token = token;
          newUser.google.name = profile.displayName;
          newUser.google.email = profile.emails[0].value;

          // save the user
          newUser.save(function(err) {
            if(err)
              throw err;

            return done(null, newUser);
          });
        }
      });
    });
  }));
};

