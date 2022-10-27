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
      require: true,
    },
    chapter: {
      type: Schema.Types.ObjectId,
      ref: "Chapter",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Page", pageSchema);
