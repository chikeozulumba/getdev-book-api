let router = require("express").Router();
let jwt = require("jsonwebtoken");
let bcrypt = require("bcrypt");
let passport = require("../functions/passport");
const User = require("../models/User");
const registerValidator = require("../functions/validator");

// LOGIN
router.post("/login", function(req, res) {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        info,
        err
      });
    }
    req.login(user, { session: false }, err => {
      if (err) {
        res.send(err);
      }
      // generate a web token for the user
      const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET);
      return res.json({ user, token: "JWT " + token });
    });
  })(req, res);
});

// REGISTER
router.post("/register", function(req, res) {
  let validation = registerValidator(req.body);
  if (
    typeof validation.status !== "undefined" &&
    (validation.status === 200 &&
      validation.email === true &&
      validation.password === true)
  ) {
    let body = validation.payload;
    let hashed;
    let BCRYPT_SALT_ROUNDS = 10;
    User.findOne({ email: body.email })
      .then(user => {
        if (user) {
          return res.status(400).json({
            saved: false,
            message: `Email already exists.`
          });
        } else {
          bcrypt.genSalt(BCRYPT_SALT_ROUNDS, function(err, salt) {
            bcrypt.hash(body.password, salt, function(err, hash) {
              let user = new User({
                first_name: body.first_name,
                last_name: body.last_name,
                telephone: body.telephone,
                email: body.email,
                address: {
                  street: body.street,
                  state: body.state,
                  country: body.country
                },
                password: hash
              });
              user.save(function(err, docs) {
                if (err) {
                  return res.status(400).json({
                    saved: false,
                    message: `Profile could not be saved.`,
                    error: err
                  });
                } else {
                  return res
                    .status(200)
                    .json({ saved: true, message: `Profile saved.`, docs });
                }
              });
            });
          });
        }
      })
      .catch(err => {
        return res.status(400).json({
          saved: false,
          message: `An error was encountered!`,
          error: err
        });
      });
  } else {
    return res.status(400).json({ validation });
  }
});

module.exports = router;
