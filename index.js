require("./functions/config");
const express = require("express");
const morgan = require("morgan");
const body_parser = require("body-parser");
const moment = require("moment");
const passport = require("./functions/passport");
const auth = require("./routes/auth");
const user = require("./routes/user");

// IMPORTS
const User = require("./models/User");

// SERVER CONFIG
const server = express();

// Install Add-ons
server.use(body_parser.urlencoded({ extended: true }));
server.use(passport.initialize());
server.use(passport.session());

// ROUTES
server.use("/auth", auth);
server.use("/user", passport.authenticate("jwt", { session: false }), user);

server.listen(3000);
