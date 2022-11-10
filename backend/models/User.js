const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    hashedPassword: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: false,
      default: 'Nothing to see here~'
    },
    profilePictureUrl: {
      type: String,
      required: false,
      default: 'https://opus-seed-profile-pictures.s3.amazonaws.com/default+photo.png'
    },
    books: [
      {
        type: Schema.Types.ObjectId,
        ref: "Book",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
