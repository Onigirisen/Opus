const express = require("express");
const passport = require("passport");
const router = express.Router();
const bcrypt = require("bcryptjs");
// const {requireUser} = require('../../config/passport')
const mongoose = require("mongoose");
const User = mongoose.model("User");
const Book = mongoose.model("Book");
const validateRegisterInput = require("../../validations/register");
const validateLoginInput = require("../../validations/login");
const { loginUser, restoreUser } = require("../../config/passport");
const { isProduction } = require("../../config/keys");
const { normalized } = require("../../util");
const { update } = require("../../models/User");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.json({
    message: "GET /api/users",
  });
});

// POST /api/users/register
router.post("/register", validateRegisterInput, async (req, res, next) => {
  // Check to make sure no one has already registered with the proposed email or
  // username.
  const user = await User.findOne({
    $or: [{ email: req.body.email }, { username: req.body.username }],
  });

  if (user) {
    // Throw a 400 error if the email address and/or email already exists
    const err = new Error("Validation Error");
    err.statusCode = 400;
    const errors = {};
    if (user.email === req.body.email) {
      errors.email = "A user has already registered with this email";
    }
    if (user.username === req.body.username) {
      errors.username = "A user has already registered with this username";
    }
    err.errors = errors;
    return next(err);
  }

  // Otherwise create a new user
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
  });

  bcrypt.genSalt(10, (err, salt) => {
    if (err) throw err;
    bcrypt.hash(req.body.password, salt, async (err, hashedPassword) => {
      if (err) throw err;
      try {
        newUser.hashedPassword = hashedPassword;
        const user = await newUser.save();
        return res.json(await loginUser(user));
      } catch (err) {
        next(err);
      }
    });
  });
});

// POST /api/users/login
router.post("/login", validateLoginInput, async (req, res, next) => {
  passport.authenticate("local", async function (err, user) {
    if (err) return next(err);
    if (!user) {
      const err = new Error("Invalid credentials");
      err.statusCode = 400;
      err.errors = { email: "Invalid credentials" };
      return next(err);
    }
    return res.json(await loginUser(user));
  })(req, res, next);
});

router.get("/current", restoreUser, (req, res) => {
  if (!isProduction) {
    // In development, allow React server to gain access to the CSRF token
    // whenever the current user information is first loaded into the
    // React application
    const csrfToken = req.csrfToken();
    res.cookie("CSRF-TOKEN", csrfToken);
  }
  if (!req.user) return res.json(null);
  res.json({
    _id: req.user._id,
    username: req.user.username,
    email: req.user.email,
    bio: req.user.bio,
  });
});

router.get(
  "/users",
  //passport.authenticate("jwt", { session: false }), //requireUser,
  (req, res) => {
    try {
      const users = User.find();

      return req.json(users);
    } catch (err) {
      res.json(err);
    }
  }
);

//An index of all public books
router.get(
  "/books",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Book.find({ user: req.user._id })
      .then((books) => res.json(normalized(books)))
      .catch((err) => res.status(404).json({ error: "No books found" }));
  }
);

// router.patch("/:book_id", validateBookInput, async (req, res) => {
//   await passport.authenticate("jwt", { session: false });
//   Book.findByIdAndUpdate(req.params.book_id, req.body, (err) => {
//     if (err) res.status(400).send(err);
//   })
//     .clone()
//     .then((book) => res.json(book));
// });

// router.patch('/:user_id', async (req, res, next) => {

//   const user_id = req.params.user_id;
//   const user = User.findOne({_id: user_id});
//   user.update({bio: req.body});
// });

router.patch("/:user_id", async (req, res) => {
  await User.findByIdAndUpdate(req.params.user_id, req.body, (err) => {
    if (err) res.status(400).send(err);
  })
    .clone()
    .then((bio) => res.json(bio));
});

module.exports = router;
