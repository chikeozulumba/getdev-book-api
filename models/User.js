const mongoose = require("mongoose");
const conn = require("../functions/db");
const moment = require("moment");
const Schema = mongoose.Schema;

let userSchema = Schema({
  first_name: { required: [true, "First Name is required."], type: String },
  last_name: { required: [true, "Last Name is required."], type: String },
  telephone: {
    unique: true,
    dropDups: true,
    required: [true, "Phone number is required."],
    type: Number
  },
  email: {
    unique: true,
    dropDups: true,
    type: String,
    required: [true, "Email field required"]
  },
  password: { type: String, required: [true, "Passsword field required"] },
  address: {
    street: { type: String, required: [true, "Enter your street address."] },
    state: { type: String, required: [true, "Fill in state field."] },
    country: { type: String, required: [true, "Fill in country field."] }
  },
  isAuthorized: { type: Boolean, default: true },
  joined_date: { type: Date, default: moment().format() },
  last_login: { type: Date, default: moment().format() },
  books: [{ type: Schema.Types.ObjectId, ref: "Books" }]
});

var User = mongoose.model("Users", userSchema);
module.exports = User;
