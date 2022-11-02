const express = require("express");
const passport = require("passport");
const router = express.Router({ mergeParams: true });
const mongoose = require("mongoose");
const Chapter = mongoose.model("Chapter");
const validateChapterInput = require("../../validations/chapter");
const { toObjectId, normalized } = require("../../util");

//An index of all chapters
router.get("/", (req, res) => {
  Chapter.find({ book: toObjectId(req.params.book_id) })
    .then((chapters) => res.json(normalized(chapters)))
    .catch((err) => {
      res.status(404).json({ error: "No chapters found" });
    });
});

//Create a chapter
router.post(
  "/",
  validateChapterInput,
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    // const err = await _checkUnique(req);
    let err;
    if (err) {
      res.json(err);
    } else {
      const newChapter = new Chapter({
        title: req.body.title,
        book: req.params.book_id,
        chapterNumber: req.body.chapterNumber,
      });

      newChapter.save().then((chapter) => {
        res.json(chapter);
      });
    }
  }
);

//A chapter show page
router.get("/:chapter_id", (req, res) => {
  Chapter.findById(req.params.chapter_id)
    .then((chapter) => res.json(chapter))
    .catch((err) =>
      res.status(404).json({ error: "No chapter found with that ID" })
    );
});

//Update a chapter
router.patch(
  "/:chapter_id",
  validateChapterInput,
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    // const err = await _checkUnique(req);
    let err;
    if (err) {
      res.json(err);
    } else {
      Chapter.findByIdAndUpdate(
        req.params.chapter_id,
        req.body,
        (err, chapter) => {
          if (err) res.status(400).send(err);
          if (!chapter) res.status(404).send({ error: "Chapter not found" });
        }
      )
        .clone()
        .then((chapter) => res.json(chapter));
    }
  }
);

//Delete a chapter
router.delete(
  "/:chapter_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Chapter.findByIdAndDelete(req.params.chapter_id, (err, chapter) => {
      if (err) res.status(400).send(err);
      if (!chapter) res.status(404).send({ error: "Chapter not found" });
      if (chapter) res.send({ Success: "Deleted" });
    });
  }
);

const _checkUnique = async (req) => {
  const chapter = await Chapter.findOne({
    $or: [
      { title: req.body.title, book: req.params.book_id },
      { chapterNumber: req.body.chapterNumber, book: req.params.book_id },
    ],
  });
  let err = null;
  if (chapter) {
    err = new Error("Validation Error");
    err.statusCode = 422;
    const errors = {};
    if (
      chapter.title === req.body.title &&
      chapter.book.toString() === req.params.book_id
    ) {
      errors.title = "That title already exists for this user";
    }

    if (
      chapter.chapterNumber === req.body.chapterNumber &&
      chapter.book.toString() === req.params.book_id
    ) {
      errors.chapterNumber = "That chapter number already exists for this book";
    }
    err.errors = errors;
  }
  return err;
};

module.exports = router;
