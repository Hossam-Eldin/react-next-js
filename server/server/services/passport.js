const passport = require('passport');
const Users = require('../models').Users;
const Strategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const bcrypt = require('bcrypt');
const uid = require('uid');
const keys = require('../config/keys');
const GooglePlusTokenStrategy = require('passport-google-plus-token')
const FacebookTokenStrategy = require('passport-facebook-token');


passport.serializeUser((user, done) => {
  done(null, user.id);
})

passport.deserializeUser(async (id, done) => {
  try {
    let result = await Users.findById(id);
    done(null, result);
  } catch (error) {
    return done(error);
  }

})




passport.use(new Strategy(async (username, password, done) => {
  try {

    let user = await Users.findOne({
      where: {
        username: username
      }
    })
    if (user) {
      let valid = bcrypt.compareSync(password, user.password);
      if (valid) {
        done(null, {
          username: user.username,
          id: user.id
        })
      } else {
        //res.send({error : 'user wast not found'})
        var error = new Error('Invalid password');
        return done(null, false, {
          message: error.message
        });
      }
    }
    if (!user) {
      var error = new Error('User not found or wrong Credentials');
      return done(null, false, {
        message: error.message
      });
    }
  } catch (error) {
    return done(error)
  }
}))

/*******************  passport  google token  ******************/
passport.use("googleToken", new GooglePlusTokenStrategy({
  clientID: "539454549386-f1s6mvnbsl14jni9bkjhfs9prjin6ggt.apps.googleusercontent.com",
  clientSecret: "mwde1ArM6TynJgn8clnwJXgF",
  passReqToCallback: true,

}, async (req, accessToken, refreshToken, profile, done) => {
  try {
    // Could get accessed in two ways:
    // 1) When registering for the first time
    // 2) When linking account to the existing one

    // Should have full user profile over here
    console.log('profile', profile);
    console.log('accessToken', accessToken);
    console.log('refreshToken', refreshToken);


    // We're in the account creation process
    let existingUser = await Users.findOne({
      where: {
        googleId: profile.id
      }
    });

    if (existingUser) {
      return done(null, existingUser);
    } else {
      const newUser = await Users.create({
        googleId: profile.id,
        username: profile.displayName,
        firstname: profile.name.givenName,
        lastname: profile.name.familyName,
        uid: uid(),
        type: 'Google',
        email: profile.emails[0].value,
        avatar: profile.photos[0].value

      });
      done(null, newUser)

    }



  } catch (error) {
    console.log(error.message)
  }

}))

/*******************   passport facebook token  ******************/
passport.use("facebookToken", new FacebookTokenStrategy({
  clientID: keys.FaceBookAPPId,
  clientSecret: keys.FaceBookAppSecret,
  passReqToCallback: true

}, async (req, accessToken, refreshToken, profile, done) => {
  try {
    console.log('profile', profile);
    console.log('accessToken', accessToken);
    console.log('refreshToken', refreshToken);
    // We're in the account creation process

    //check if the facebook id exist 
    let existingUser = await Users.findOne({
      where: {
        facebookId: profile.id
      }
    });
    //if it exist send the data 
    if (existingUser) {
      return done(null, existingUser);
    } else {
      //create new one if it didn't exist
      const user = await Users.create({
        facebookId: profile.id,
        username: profile.displayName,
        firstname: profile.name.givenName + ' ' + profile.name.middleName,
        lastname: profile.name.familyName,
        uid: uid(),
        type: 'FaceBook',
        email: profile.emails[0].value,
        avatar: profile.photos[0].value

      });
      done(null, user)
    }


  } catch (error) {
    console.log(error.message)
  }
}))





/******************  google passport  ******************/
passport.use(new GoogleStrategy({
    clientID: keys.googleClientId,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/api/auth/google/callback',
    proxy: true
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      console.log(profile);
      let user = await Users.findOne({
        where: {
          googleId: profile.id
        }
      })

      if (user) {
        done(null, user)

      } else {
        const user = await Users.create({
          googleId: profile.id,
          username: profile.displayName,
          firstname: profile.name.givenName,
          lastname: profile.name.familyName,
          uid: uid(),
          type: 'Google',
          email: profile.emails[0].value,
          avatar: profile.photos[0].value

        });
        done(null, user)
      }

    } catch (error) {
      return done(error);
    }
  }
))



/**facebook passport  */

passport.use(new FacebookStrategy({
    clientID: keys.FaceBookAPPId,
    clientSecret: keys.FaceBookAppSecret,
    callbackURL: '/api/auth/facebook/callback',
    profileFields: ['id', 'displayName', 'emails', 'name', 'picture.type(large)'],
    proxy: true
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      console.log(profile);
      let user = await Users.findOne({
        where: {
          facebookId: profile.id
        }
      })

      if (user) {
        done(null, user)

      } else {
        const user = await Users.create({
          facebookId: profile.id,
          username: profile.displayName,
          firstname: profile.name.givenName + ' ' + profile.name.middleName,
          lastname: profile.name.familyName,
          uid: uid(),
          type: 'FaceBook',
          email: profile.emails[0].value,
          avatar: profile.photos[0].value

        });
        done(null, user)
      }

    } catch (error) {
      return done(error);
    }
  }))




/*

app.get('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.redirect('/login'); }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.redirect('/users/' + user.username);
    });
  })(req, res, next);
});
  */