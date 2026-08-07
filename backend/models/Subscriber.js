const mongoose = require("mongoose");

/**
 * Subscriber Schema
 * Stores email addresses of users who subscribe to the newsletter.
 * Each email must be unique to prevent duplicate subscriptions.
 * savedArticles tracks articles bookmarked by this subscriber.
 */
const subscriberSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    savedArticles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subscriber", subscriberSchema);