const { check } = require("express-validator");
const handleValidationErrors = require("./handleValidationErrors");

// validateLoginInput is a combination Express middleware that uses the `check`
// middleware to validate the keys in the body of a request to login a user
const validateBookInput = [
  check("title")
    .exists({ checkFalsy: true })
    .isLength({ max: 250 })
    .withMessage("Title is invalid"),
  check("description")
    .exists({ checkFalsy: true })
    .isLength({ max: 3000 })
    .withMessage("Description is invalid"),
  check("coverColor")
    .exists({ checkFalsy: true })
    .isLength({ max: 50 })
    .withMessage("Cover Color is invalid"),
  check("coverColor").exists({ checkFalsy: true }),
  handleValidationErrors,
];

module.exports = validateBookInput;
