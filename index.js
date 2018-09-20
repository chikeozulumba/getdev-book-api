require("./functions/config");
const express = require("express");
const morgan = require("morgan");
const body_parser = require("body-parser");
const moment = require("moment");
const passport = require("./functions/passport");
const auth = require("./routes/auth");
const user = require("./routes/user");
const book = require("./routes/book");

// IMPORTS
const User = require("./models/User");

// app CONFIG
const app = express();

// Install Add-ons
app.use(body_parser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(morgan("combined"));
//Handle errors
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  return res.json({ error: err });
});
// ROUTES
app.use("/auth", auth);
app.use("/user", passport.authenticate("jwt", { session: false }), user);
app.use("/books", passport.authenticate("jwt", { session: false }), book);

app.listen(3000);
