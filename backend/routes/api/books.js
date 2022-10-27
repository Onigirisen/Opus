const express = require("express");
const passport = require("passport");
const router = express.Router();
const mongoose = require("mongoose");
const Book = mongoose.model("Book");
const validateBookInput = require("../../validations/book");
const { normalized } = require("../../util");

//An index of all public books
router.get("/", (req, res) => {
  Book.find({ public: true })
    .then((books) => res.json(normalized(books)))
    .catch((err) => res.status(404).json({ error: "No books found" }));
});

//Create a Book
router.post(
  "/",
  validateBookInput,
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const newBook = new Book({
      title: req.body.title,
      user: req.user._id,
      coverColor: req.body.coverColor,
      public: req.body.public || false,
    });

    newBook.save().then((book) => res.json(book));
  }
);

//A book show page
router.get(
  "/:book_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Book.findById(req.params.book_id)
      .then((book) => res.json(book))
      .catch((err) =>
        res.status(404).json({ error: "No book found with that ID" })
      );
  }
);

//Update a book
router.patch("/:book_id", validateBookInput, async (req, res) => {
  await passport.authenticate("jwt", { session: false });
  Book.findByIdAndUpdate(req.params.book_id, req.body, (err) => {
    if (err) res.status(400).send(err);
  })
    .clone()
    .then((book) => res.json(book));
});

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
    //   .clone()
    //   .then(() => res.json({ Success: "Deleted" }));
  }
);

module.exports = router;
