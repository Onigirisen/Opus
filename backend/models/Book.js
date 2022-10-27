const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = Schema(
  {
    title: {
      type: String,
      required: true,
    },
    coverColor: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    public: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", bookSchema);
