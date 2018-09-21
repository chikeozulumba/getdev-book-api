const mongoose = require("mongoose");
const moment = require("moment");
const Schema = mongoose.Schema;

let bookSchema = Schema({
  title: { required: [true, "Book title is required."], type: String },
  summary: {
    required: [true, "Please provide a summary for your book."],
    type: String
  },
  genre: {
    type: String,
    required: [true, "No genre provided"]
  },
  cover: {
    type: String,
    default: `https://images-na.ssl-images-amazon.com/images/I/51rJBIWvilL._SY445_.jpg`
  },
  rating: {
    required: [true, "Please provide a rating for your book."],
    type: Number
  },
  timestamps: {
    date_published: {
      type: Date,
      required: [true, "Please provide the date your book was published."]
    },
    date_created: {
      type: Date,
      default: moment().format()
    },
    date_updated: {
      type: Date,
      default: moment().format()
    }
  },
  author: [{ type: Schema.Types.ObjectId, ref: "Users" }],
  raters: [{ type: Schema.Types.ObjectId, ref: "Users" }]
});

var Book = mongoose.model("Books", bookSchema);
module.exports = Book;
