const mongoose = require("mongoose");

/**
 * Category Schema
 * Stores blog categories that admin can manage.
 * Each category has a name and an optional image URL.
 */
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      unique: true,
      trim: true,
    },
    image: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);