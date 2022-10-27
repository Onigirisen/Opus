const { check } = require("express-validator");
const handleValidationErrors = require("./handleValidationErrors");

// validateLoginInput is a combination Express middleware that uses the `check`
// middleware to validate the keys in the body of a request to login a user
const validateChapterInput = [
  check("title")
    .exists({ checkFalsy: true })
    .isLength({ max: 250 })
    .withMessage("Title is invalid"),
  check("chapterNumber")
    .exists({ checkFalsy: true })
    .isInt({ min: 1, max: 40 }),
  handleValidationErrors,
];

module.exports = validateChapterInput;
