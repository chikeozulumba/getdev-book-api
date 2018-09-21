require("./functions/config");
const express = require("express");
const morgan = require("morgan");
const db = require("./functions/db");
const cors = require("cors");
const bodyParser = require("body-parser");
const moment = require("moment");
const passport = require("./functions/passport");
const auth = require("./routes/auth");
const user = require("./routes/user");
const book = require("./routes/book");

// IMPORTS
const User = require("./models/User");

// app CONFIG
const app = express();
//db connection
db.on("error", console.error.bind(console, "connection error:"));
// Install Add-ons
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/json" }));
app.use(passport.initialize());
app.use(passport.session());

app.use(morgan("combined"));
app.use(cors());
//Handle errors
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  return res.json({ error: err });
});
// ROUTES
app.use("/auth", auth);
app.use("/user", passport.authenticate("jwt", { session: false }), user);
app.use("/books", passport.authenticate("jwt", { session: false }), book);
// app.use("v1/books", book);

app.listen(3000);

module.exports = app;
