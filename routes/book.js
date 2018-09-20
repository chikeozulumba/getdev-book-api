//routes/user.js
const express = require("express");
const moment = require("moment");
const Joi = require("joi");
const router = express.Router();
const Book = require("../models/Book");

let schema = Joi.object().keys({
  title: Joi.string()
    .min(3)
    .max(30)
    .required(),
  genre: Joi.string()
    .min(3)
    .max(30)
    .required(),
  cover: Joi.required(),
  summary: Joi.string().required(),
  rating: Joi.number()
    .integer()
    .min(1)
    .max(5)
    .required(),
  date_published: Joi.date()
    .iso()
    .required()
    .max("now")
});

/* GET all books listing. */
router.get("/", function(req, res, next) {
  let user = req.user;
  Book.find({})
    .then(books => {
      return res.status(200).json({
        books
      });
    })
    .catch(error => {
      return res.status(400).json({
        error
      });
    });
});

// Create books
router.post("/create", function(req, res, next) {
  let user = req.user;
  let data = req.body;
  Joi.validate(data, schema, (err, value) => {
    const id = Math.ceil(Math.random() * 9999999);
    if (err) {
      res.status(422).json({
        status: "error",
        err: err
      });
    } else {
      let book = new Book({
        title: value.title,
        summary: value.summary,
        rating: value.rating,
        genre: value.genre,
        cover: value.cover,
        timestamps: {
          date_published: moment(value.date_published).format()
        },
        author: [user._id],
        raters: [user._id]
      });
      book.save(function(err, docs) {
        if (err) {
          return res.status(400).json({
            saved: false,
            message: `Book could not be saved.`,
            error: err
          });
        } else {
          return res
            .status(200)
            .json({ saved: true, message: `Book saved.`, docs });
        }
      });
    }
  });
});

/* GET Book By ID. */
router.get("/:id", function(req, res, next) {
  let book_id = req.params.id;
  Book.findById({ _id: book_id }, function(err, docs) {
    if (err) {
      return res.status(400).json({
        message: `Book not found.`,
        error: err
      });
    } else if (!docs) {
      return res.status(301).json({ book: `Not Found` });
    } else {
      return res.status(301).json({ docs });
    }
  });
});

/* Update Book. */
router.post("/update/:id", function(req, res, next) {
  let user = req.user;
  let data = req.body;
  Book.findById({ _id: req.params.id }, (err, book) => {
    if (err || !book) {
      return res.status(200).json({
        message: `Book not found`
      });
    } else {
      const bookModel = book;
      Joi.validate(data, schema, (err, value) => {
        if (err) {
          res.status(422).json({
            status: "error",
            err: err
          });
        } else {
          bookModel.title = value.title;
          bookModel.summary = value.summary;
          bookModel.genre = value.genre;
          bookModel.cover = value.cover;
          bookModel.timestamps.date_published = moment(
            value.date_published
          ).format();
          bookModel.raters.push(user._id);
          let count = bookModel.raters.length;
          bookModel.rating =
            Math.ceil(bookModel.rating / count) > 5
              ? 5
              : Math.ceil(bookModel.rating / count);
          bookModel.save(function(err, docs) {
            if (err) {
              return res.status(400).json({
                saved: false,
                message: `Book could not be saved.`,
                error: err
              });
            } else {
              return res
                .status(200)
                .json({ saved: true, message: `Book saved.`, docs });
            }
          });
        }
      });
    }
  });
});

/* DELETE Book By ID. */
router.get("/delete/:id", function(req, res, next) {
  let book_id = req.params.id;
  Book.findByIdAndDelete(book_id, function(err, docs) {
    if (err) {
      return res.status(400).json({
        message: `Book not found.`,
        error: err,
        deleted: false
      });
    } else {
      return res.status(200).json({ saved: true, deleted: true });
    }
  });
});
module.exports = router;
