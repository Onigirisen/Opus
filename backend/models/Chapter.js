const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chapterSchema = Schema(
  {
    title: {
      type: String,
      required: true,
    },
    chapterNumber: {
      type: Number,
      required: true,
    },
    book: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Chapter", chapterSchema);
