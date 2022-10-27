const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chapterSchema = Schema(
  {
    title: {
      type: String,
    },
    book: {
      type: Schema.Types.ObjectId,
      ref: "Book",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Chapter", chapterSchema);
