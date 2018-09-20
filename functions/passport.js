const passport = require("passport");
const bcrypt = require("bcrypt");
const passportJWT = require("passport-jwt");
const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const User = require("../models/User");
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    function(email, password, cb) {
      return User.findOne({ email: email })
        .then(user => {
          if (!user) {
            return cb(null, false, { message: "Email address not assigned." });
          } else {
            bcrypt.compare(password, user.password, function(err, res) {
              if (res === true) {
                return cb(null, user, { message: "Logged In Successfully" });
              } else {
                return cb(null, false, {
                  message: "Password is incorrect.",
                  status: 400
                });
              }
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET
    },
    function(jwtPayload, cb) {
      return User.findById(jwtPayload._id)
        .then(user => {
          return cb(null, user);
        })
        .catch(err => {
          return cb(err);
        });
    }
  )
);

module.exports = passport;
