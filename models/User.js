const mongoose = require("mongoose");
const moment = require("moment");
const Schema = mongoose.Schema;

let User;

User = new Schema({
  first_name: String,
  last_name: String,
  telephone: Number,
  email: String,
  address: {
    street: String,
    state: String,
    country: String
  },
  isValidated: Boolean,
  isAuthorized: Boolean,
  joined_date: { type: Date, default: moment().format() },
  last_login: { type: Date, default: moment().format() }
});

module.exports = User;
