const { check } = require("express-validator");
const handleValidationErrors = require("./handleValidationErrors");

// validateLoginInput is a combination Express middleware that uses the `check`
// middleware to validate the keys in the body of a request to login a user
const validatePageInput = [
  check("content")
    .exists({ checkFalsy: true })
    .isLength({ max: 10000 })
    .withMessage("Content is invalid"),
  check("pageNumber")
    .exists({ checkFalsy: true })
    .isInt({ min: 1, max: 2000 })
    .withMessage("Page Number is invalid"),
  handleValidationErrors,
];

module.exports = validatePageInput;
