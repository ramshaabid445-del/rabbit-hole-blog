const express = require("express");
const { body, param } = require("express-validator");
const Comment = require("../models/Comment");
const Post = require("../models/Post");
const { validate, isValidObjectId } = require("../middleware/validationMiddleware");

const router = express.Router();

/**
 * GET /api/comments/:postId
 * Fetch approved comments for a post.
 */
router.get(
  "/:postId",
  [
    param("postId")
      .custom(isValidObjectId)
      .withMessage("Invalid post ID"),
  ],
  validate,
  async (req, res) => {
    try {
      const { postId } = req.params;
      const comments = await Comment.find({
        postId: postId,
        status: "approved"
      })
      .sort({ createdAt: -1 })
      .select("name comment createdAt");
      res.json(comments);
    } catch (error) {
      console.error("Fetch comments error:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

/**
 * POST /api/comments
 * Submit a new comment for moderation.
 * Validates all fields via express-validator.
 */
router.post(
  "/",
  [
    body("postId")
      .notEmpty()
      .withMessage("Post ID is required")
      .custom(isValidObjectId)
      .withMessage("Invalid post ID format"),
    body("name")
      .trim()
      .notEmpty()
      .withMessage("Name is required")
      .isLength({ max: 100 })
      .withMessage("Name must be under 100 characters"),
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Valid email is required")
      .normalizeEmail(),
    body("comment")
      .trim()
      .notEmpty()
      .withMessage("Comment is required")
      .isLength({ min: 2, max: 2000 })
      .withMessage("Comment must be between 2 and 2000 characters"),
  ],
  validate,
  async (req, res) => {
    try {
      const { postId, name, email, comment } = req.body;

      const post = await Post.findById(postId).exec();
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      const newComment = new Comment({
        postId: post._id,
        postTitle: post.title,
        name: String(name).trim(),
        email: String(email).trim().toLowerCase(),
        comment: String(comment).trim(),
        status: "pending"
      });
      const saved = await newComment.save();
      console.log("Comment saved:", saved._id);
      res.status(201).json({
        message: "Comment submitted for moderation.",
        comment: {
          id: saved._id,
          name: saved.name,
          comment: saved.comment,
          createdAt: saved.createdAt
        }
      });
    } catch (error) {
      console.error("Comment creation error:", error);
      res.status(500).json({ message: "Server error: " + error.message });
    }
  }
);

module.exports = router;