const express = require("express");
const passport = require("passport");
const router = express.Router();
const mongoose = require("mongoose");
const Book = mongoose.model("Book");
const validateBookInput = require("../../validations/book");
const { normalized } = require("../../util");
// const validateChapterInput = require("../../validations/chapter");
// const Chapter = require("../../models/Chapter");

//An index of all public books
router.get("/", (req, res) => {
  Book.find()
    .then((books) => res.json(normalized(books)))
    .catch((err) => res.status(404).json({ error: "No books found" }));
});

//Create a Book
router.post(
  "/",
  validateBookInput,
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    // const err = await _checkUnique(req);
    let err;
    if (err) {
      res.json(err);
    } else {
      const newBook = new Book({
        title: req.body.title,
        user: req.user._id,
        coverColor: req.body.coverColor,
        public: req.body.public || false,
        genre: req.body.genre,
        description: req.body.description,
      });

      newBook.save().then((book) => res.json(book));
    }
  }
);

//A book show page
router.get("/:book_id", (req, res) => {
  Book.findById(req.params.book_id)
    .then((book) => res.json(book))
    .catch((err) =>
      res.status(404).json({ error: "No book found with that ID" })
    );
});

//Update a book
router.patch(
  "/:book_id",
  validateBookInput,
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    // const err = await _checkUnique(req);
    let err;
    if (err) {
      res.json(err);
    } else {
      Book.findByIdAndUpdate(req.params.book_id, req.body, (err, book) => {
        if (err) res.status(400).send(err);
        if (!book) res.status(404).send({ error: "Book not found" });
      })
        .clone()
        .then((book) => res.json(book));
    }
  }
);

//Delete a book
router.delete(
  "/:book_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Book.findByIdAndDelete(req.params.book_id, (err, book) => {
      if (err) res.status(400).send(err);
      if (!book) res.status(404).send({ error: "Book not found" });
      if (book) res.send({ Success: "Deleted" });
    });
  }
);

// const _checkUnique = async (req) => {
//   const book = await Book.findOne({
//     title: req.body.title,
//     user: req.user._id,
//   });
//   let err = null;
//   if (book) {
//     err = new Error("Validation Error");
//     err.statusCode = 422;
//     const errors = {};
//     if (
//       book.title === req.body.title &&
//       book.user.toString() === req.user._id.toString()
//     ) {
//       errors.title = "That title already exists for this user";
//     }
//     err.errors = errors;
//   }
//   return err;
// };

module.exports = router;
