const router = require("express").Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");

// LOGIN
router.post("/login", function(req, res) {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        message: "Something is not right",
        user: user,
        err
      });
    }
    req.login(user, { session: false }, err => {
      if (err) {
        res.send(err);
      }
      // generate a web token for the user
      const token = jwt.sign(user, process.env.JWT_SECRET);
      return res.json({ user, token });
    });
  })(req, res);
});

// REGISTER
router.post("/register", function(req, res) {});

module.exports = router;
