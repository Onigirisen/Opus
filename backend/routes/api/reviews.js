const express = require("express");
const passport = require("passport");
const router = express.Router({ mergeParams: true });
const mongoose = require("mongoose");
const Review = mongoose.model("Review");
const validateReviewInput = require("../../validations/review");
const { toObjectId, normalized } = require("../../util");

//An index of all reviews for the book
router.get("/", (req, res) => {
  Review.find({ review: toObjectId(req.params.review_id) })
    .then((reviews) => res.json(normalized(reviews)))
    .catch((err) => {
      res.status(404).json({ error: "No reviews found" });
    });
});

//Create a review
router.post(
  "/",
  validateReviewInput,
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    let err;
    if (err) {
      res.json(err);
    } else {
      const newReview = new Review({
        content: req.body.content,
        book: req.params.book_id,
        user: req.user._id,
        rating: req.body.rating,
      });

      newReview.save().then((review) => {
        res.json(review);
      });
    }
  }
);

//A review show page
router.get("/:review_id", (req, res) => {
  Review.findById(req.params.review_id)
    .then((review) => res.json(review))
    .catch((err) =>
      res.status(404).json({ error: "No review found with that ID" })
    );
});

//Update a review
router.patch(
  "/:review_id",
  validateReviewInput,
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    // const err = await _checkUnique(req);
    let err;

    if (err) {
      res.json(err);
    } else {
      Review.findByIdAndUpdate(
        req.params.review_id,
        req.body,
        (err, review) => {
          if (err) res.status(400).send(err);
          if (!review) res.status(404).send({ error: "Review not found" });
        }
      )
        .clone()
        .then((review) => res.json(review));
    }
  }
);

//Delete a review
router.delete(
  "/:review_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Review.findByIdAndDelete(req.params.review_id, (err, review) => {
      if (err) res.status(400).send(err);
      if (!review) res.status(404).send({ error: "Review not found" });
      if (review) res.send({ Success: "Deleted" });
    });
  }
);

module.exports = router;
