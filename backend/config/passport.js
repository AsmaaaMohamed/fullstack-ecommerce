const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const UserModel = require("../models/userModel");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, cb) => {
      console.log("refreshhhhhhhhh:", refreshToken);
      try {
        const user = await UserModel.findOne({ email: profile.emails[0].value}).lean();
        console.log("Google profile:", profile);
        if (user) {   
          if (!user.googleId )
              return cb(null, false, { message: "This Email is already in use" });      
            user.secret = accessToken; // Store the access token in the user object
            console.log("Existing user found:", user);
            return cb(null, user);
          }
        else {
          const newUser = new UserModel({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
          });
          newUser.save().then((result) => {
            const plainUser = result.toObject(); // Store the access token in the user object
            plainUser.secret = accessToken;
            return cb(null, plainUser);
          });
        }
      } catch (error) {
        return cb(error, null);
      }
    }
  )
);
//facebook strategy
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: "http://localhost:3000/api/auth/facebook/callback",
      profileFields: ["emails", "name"],
    },
    async (accessToken, refreshToken, profile, cb) => {
      console.log("Facebook profile:", profile);
      try {
        const email = profile.emails[0].value;

        let user = await UserModel.findOne({ email }).lean();
        console.log("Facebook profile:", profile);
        if (!user) {
          user = await UserModel.create({
            name: profile.name.givenName + " " + profile.name.familyName,
            email,
            facebookId: profile.id,
          });
          const plainUser = user.toObject();
          plainUser.secret = accessToken;
          return cb(null, plainUser);
        } else {
          if (!user.facebookId)
              return cb(null, false, { message: "This Email is already in use" });
          user.secret = accessToken; // Store the access token in the user object
          return cb(null, user);
        }

        
      } catch (err) {
        return cb(err, null);
      }
    }
  )
);
// Export nothing (just register strategies)
module.exports = passport;