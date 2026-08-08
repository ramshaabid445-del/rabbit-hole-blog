const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body } = require("express-validator");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const Category = require("../models/Category");
const User = require("../models/User");
const Subscriber = require("../models/Subscriber");
const { protect } = require("../middleware/authMiddleware");
const { validate } = require("../middleware/validationMiddleware");

const router = express.Router();

// ============================================================
// AUTHENTICATION
// ============================================================

/**
 * POST /api/admin/login
 * Admin login — verifies credentials against User collection.
 * Validates email/password via express-validator.
 */
router.post(
  "/login",
  [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Valid email is required"),
    body("password")
      .notEmpty()
      .withMessage("Password is required"),
  ],
  validate,
  async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email: email.trim().toLowerCase() });
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // Generate JWT token
      // Token expiry is set to 1 hour so it doesn't expire too quickly.
      // Inactivity auto-logout (3 min) is handled manually on the frontend.
      const token = jwt.sign(
        { id: user._id, name: user.name, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.json({
        message: "Login successful",
        token,
        admin: { id: user._id, name: user.name, email: user.email },
      });
    } catch (error) {
      console.error("Admin login error:", error.message);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// ============================================================
// DASHBOARD STATS
// ============================================================

/**
 * GET /api/admin/stats
 * Returns dashboard overview stats.
 */
router.get("/stats", protect, async (req, res) => {
  try {
    const totalBlogs = await Post.countDocuments();
    const totalSubscribers = await Subscriber.countDocuments();
    const totalComments = await Comment.countDocuments();
    const pendingComments = await Comment.countDocuments({ status: "pending" });

    // Most trending article (highest views)
    const trendingArticle = await Post.findOne()
      .sort({ views: -1 })
      .select("title views numericId");

    res.json({
      totalBlogs,
      totalSubscribers,
      totalComments,
      pendingComments,
      trendingArticle,
    });
  } catch (error) {
    console.error("Stats error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// ============================================================
// BLOG CRUD
// ============================================================

/**
 * GET /api/admin/posts
 * Fetch all posts (including content, sorted by newest first).
 */
router.get("/posts", protect, async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * GET /api/admin/posts/:id
 * Fetch a single post by its MongoDB _id.
 */
router.get("/posts/:id", protect, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (error) {
    console.error("Error fetching post:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * POST /api/admin/posts
 * Create a new blog post.
 * Validates required fields via express-validator.
 */
router.post(
  "/posts",
  protect,
  [
    body("title")
      .trim()
      .notEmpty()
      .withMessage("Title is required")
      .isLength({ max: 200 })
      .withMessage("Title must be under 200 characters"),
    body("excerpt")
      .trim()
      .notEmpty()
      .withMessage("Excerpt is required"),
    body("category")
      .trim()
      .notEmpty()
      .withMessage("Category is required"),
    body("image")
      .trim()
      .notEmpty()
      .withMessage("Cover image is required"),
  ],
  validate,
  async (req, res) => {
    try {
      const {
        title, excerpt, category, image, readTime,
        images, content, contentBlocks, tags, status,
        isEditorsPick, isTrending, isFreshPerspective,
      } = req.body;

      // Auto-generate numericId
      const lastPost = await Post.findOne().sort({ numericId: -1 });
      const numericId = lastPost ? lastPost.numericId + 1 : 1;

      const post = new Post({
        numericId,
        title,
        excerpt,
        category,
        image,
        readTime: readTime || `${Math.ceil((content?.length || contentBlocks?.length || 1) * 1.5)} min read`,
        images: images || [],
        content: content || [],
        contentBlocks: contentBlocks || [],
        tags: tags || [],
        status: status || "draft",
        isEditorsPick: isEditorsPick || false,
        isTrending: isTrending || false,
        isFreshPerspective: isFreshPerspective || false,
      });

      await post.save();
      res.status(201).json({ message: "Post created successfully", post });
    } catch (error) {
      console.error("Error creating post:", error.message);
      res.status(500).json({ message: "Server error" });
    }
  }
);

/**
 * PUT /api/admin/posts/:id
 * Update an existing blog post.
 */
router.put("/posts/:id", protect, async (req, res) => {
  try {
    const {
      title, excerpt, category, image, readTime,
      images, content, contentBlocks, tags, status,
      isEditorsPick, isTrending, isFreshPerspective,
    } = req.body;

    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (excerpt !== undefined) updateData.excerpt = excerpt;
    if (category !== undefined) updateData.category = category;
    if (image !== undefined) updateData.image = image;
    if (readTime !== undefined) updateData.readTime = readTime;
    if (images !== undefined) updateData.images = images;
    if (content !== undefined) updateData.content = content;
    if (contentBlocks !== undefined) updateData.contentBlocks = contentBlocks;
    if (tags !== undefined) updateData.tags = tags;
    if (status !== undefined) updateData.status = status;
    if (isEditorsPick !== undefined) updateData.isEditorsPick = isEditorsPick;
    if (isTrending !== undefined) updateData.isTrending = isTrending;
    if (isFreshPerspective !== undefined) updateData.isFreshPerspective = isFreshPerspective;

    const post = await Post.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!post) return res.status(404).json({ message: "Post not found" });

    res.json({ message: "Post updated successfully", post });
  } catch (error) {
    console.error("Error updating post:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * DELETE /api/admin/posts/:id
 * Delete a blog post.
 */
router.delete("/posts/:id", protect, async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * PUT /api/admin/posts/:id/sections
 * Update the section flags (Editors Pick, Trending, Fresh Perspective) for a post.
 */
router.put("/posts/:id/sections", protect, async (req, res) => {
  try {
    const { isEditorsPick, isTrending, isFreshPerspective } = req.body;
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { isEditorsPick, isTrending, isFreshPerspective },
      { new: true }
    );
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json({ message: "Sections updated", post });
  } catch (error) {
    console.error("Error updating sections:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// ============================================================
// COMMENTS MANAGEMENT
// ============================================================

/**
 * GET /api/admin/comments
 * Fetch all comments, sorted by newest first.
 * Query params: ?status=pending|approved|rejected
 */
router.get("/comments", protect, async (req, res) => {
  try {
    const filter = {};
    if (req.query.status) {
      filter.status = req.query.status;
    }
    const comments = await Comment.find(filter)
      .sort({ createdAt: -1 })
      .populate("postId", "title numericId");
    res.json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * PUT /api/admin/comments/:id
 * Update comment status (approve/reject).
 * Validates status and comment ID via express-validator.
 */
router.put(
  "/comments/:id",
  protect,
  [
    body("status")
      .notEmpty()
      .withMessage("Status is required")
      .isIn(["pending", "approved", "rejected"])
      .withMessage("Status must be pending, approved, or rejected"),
  ],
  validate,
  async (req, res) => {
    try {
      const { status } = req.body;
      const comment = await Comment.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true }
      );
      if (!comment) return res.status(404).json({ message: "Comment not found" });
      res.json({ message: `Comment ${status}`, comment });
    } catch (error) {
      console.error("Error updating comment:", error.message);
      res.status(500).json({ message: "Server error" });
    }
  }
);

/**
 * DELETE /api/admin/comments/:id
 * Delete a comment.
 */
router.delete("/comments/:id", protect, async (req, res) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id);
    if (!comment) return res.status(404).json({ message: "Comment not found" });
    res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Error deleting comment:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// ============================================================
// CATEGORY MANAGEMENT
// ============================================================

/**
 * GET /api/admin/categories
 * Fetch all categories.
 */
router.get("/categories", protect, async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * POST /api/admin/categories
 * Create a new category.
 * Validates name via express-validator.
 */
router.post(
  "/categories",
  protect,
  [
    body("name")
      .trim()
      .notEmpty()
      .withMessage("Category name is required")
      .isLength({ max: 100 })
      .withMessage("Category name must be under 100 characters"),
  ],
  validate,
  async (req, res) => {
    try {
      const { name, image } = req.body;

      const existing = await Category.findOne({ name: name.trim() });
      if (existing) return res.status(400).json({ message: "Category already exists" });

      const category = new Category({ name: name.trim(), image: image || "" });
      await category.save();
      res.status(201).json({ message: "Category created", category });
    } catch (error) {
      console.error("Error creating category:", error.message);
      res.status(500).json({ message: "Server error" });
    }
  }
);

/**
 * PUT /api/admin/categories/:id
 * Update a category.
 */
router.put("/categories/:id", protect, async (req, res) => {
  try {
    const { name, image } = req.body;
    const updateData = {};
    if (name !== undefined) updateData.name = name.trim();
    if (image !== undefined) updateData.image = image;

    const category = await Category.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });
    if (!category) return res.status(404).json({ message: "Category not found" });
    res.json({ message: "Category updated", category });
  } catch (error) {
    console.error("Error updating category:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * DELETE /api/admin/categories/:id
 * Delete a category.
 */
router.delete("/categories/:id", protect, async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).json({ message: "Category not found" });
    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error deleting category:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// ============================================================
// HOME SECTIONS MANAGER
// ============================================================

/**
 * GET /api/admin/home-sections
 * Get all published posts with section flags.
 */
router.get("/home-sections", protect, async (req, res) => {
  try {
    const posts = await Post.find({ status: "published" })
      .select("title numericId category isEditorsPick isTrending isFreshPerspective image views")
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    console.error("Error fetching home sections:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * PUT /api/admin/home-sections
 * Bulk update section flags for multiple posts.
 * Body: { updates: [...] }
 * Validates that updates is a non-empty array via express-validator.
 */
router.put(
  "/home-sections",
  protect,
  [
    body("updates")
      .isArray({ min: 1 })
      .withMessage("updates must be a non-empty array"),
  ],
  validate,
  async (req, res) => {
    try {
      const { updates } = req.body;

      for (const update of updates) {
        await Post.findByIdAndUpdate(update._id, {
          isEditorsPick: update.isEditorsPick || false,
          isTrending: update.isTrending || false,
          isFreshPerspective: update.isFreshPerspective || false,
        });
      }

      res.json({ message: "Home sections updated successfully" });
    } catch (error) {
      console.error("Error updating home sections:", error.message);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// ============================================================
// ADMIN PROFILE MANAGEMENT
// ============================================================

/**
 * PUT /api/admin/profile/:id
 * Update admin profile (name, email, password).
 * Validates fields via express-validator.
 */
router.put(
  "/profile/:id",
  protect,
  [
    body("name")
      .optional()
      .trim()
      .isLength({ max: 100 })
      .withMessage("Name must be under 100 characters"),
    body("email")
      .optional()
      .trim()
      .isEmail()
      .withMessage("Valid email is required"),
    body("newPassword")
      .optional()
      .isLength({ min: 6 })
      .withMessage("New password must be at least 6 characters"),
    body("currentPassword")
      .if(body("newPassword").exists())
      .notEmpty()
      .withMessage("Current password is required to set a new password"),
  ],
  validate,
  async (req, res) => {
    try {
      const { name, email, currentPassword, newPassword } = req.body;

      const user = await User.findById(req.params.id);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const updateData = {};

      // Update name if provided
      if (name !== undefined && name.trim()) {
        updateData.name = name.trim();
      }

      // Update email if provided and different
      if (email !== undefined && email.trim() && email !== user.email) {
        const existingUser = await User.findOne({ email: email.trim() });
        if (existingUser) {
          return res.status(400).json({ message: "Email already in use" });
        }
        updateData.email = email.trim();
      }

      // Update password if provided
      if (newPassword) {
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
          return res.status(401).json({ message: "Current password is incorrect" });
        }
        updateData.password = await bcrypt.hash(newPassword, 10);
      }

      if (Object.keys(updateData).length === 0) {
        return res.status(400).json({ message: "No changes provided" });
      }

      const updatedUser = await User.findByIdAndUpdate(req.params.id, updateData, {
        new: true,
        select: "name email",
      });

      res.json({
        message: "Profile updated successfully",
        admin: { id: updatedUser._id, name: updatedUser.name, email: updatedUser.email },
      });
    } catch (error) {
      console.error("=== PROFILE UPDATE ERROR ===");
      console.error("Error:", error.message);
      res.status(500).json({ message: "Server error" });
    }
  }
);

module.exports = router;