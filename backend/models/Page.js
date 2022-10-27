const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pageSchema = Schema(
  {
    pageNumber: {
      type: Number,
      require: true,
    },
    content: {
      type: String,
      required: true,
    },
    chapter: {
      type: Schema.Types.ObjectId,
      ref: "Chapter",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Page", pageSchema);
