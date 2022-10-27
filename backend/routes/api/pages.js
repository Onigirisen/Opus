const express = require("express");
const passport = require("passport");
const router = express.Router({ mergeParams: true });
const mongoose = require("mongoose");
const Page = mongoose.model("Page");
const validatePageInput = require("../../validations/page");
const { toObjectId, normalized } = require("../../util");

//An index of all pages
router.get("/", (req, res) => {
  Page.find({ page: toObjectId(req.params.page_id) })
    .then((pages) => res.json(normalized(pages)))
    .catch((err) => {
      console.log(err);
      res.status(404).json({ error: "No pages found" });
    });
});

//Create a page
router.post(
  "/",
  validatePageInput,
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    // const err = await _checkUnique(req);
    let err;
    if (err) {
      res.json(err);
    } else {
      const newPage = new Page({
        content: req.body.content,
        chapter: req.params.chapter_id,
        pageNumber: req.body.pageNumber,
      });

      newPage.save().then((page) => {
        console.log(page);
        res.json(page);
      });
    }
  }
);

//A page show page
router.get("/:page_id", (req, res) => {
  Page.findById(req.params.page_id)
    .then((page) => res.json(page))
    .catch((err) =>
      res.status(404).json({ error: "No page found with that ID" })
    );
});

//Update a page
router.patch(
  "/:page_id",
  validatePageInput,
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    // const err = await _checkUnique(req);
    let err;

    if (err) {
      res.json(err);
    } else {
      Page.findByIdAndUpdate(req.params.page_id, req.body, (err, page) => {
        if (err) res.status(400).send(err);
        if (!page) res.status(404).send({ error: "Page not found" });
      })
        .clone()
        .then((page) => res.json(page));
    }
  }
);

//Delete a page
router.delete(
  "/:page_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Page.findByIdAndDelete(req.params.page_id, (err, page) => {
      if (err) res.status(400).send(err);
      if (!page) res.status(404).send({ error: "Page not found" });
      if (page) res.send({ Success: "Deleted" });
    });
  }
);

module.exports = router;
