const express = require("express");
const { param } = require("express-validator");
const Post = require("../models/Post");
const Category = require("../models/Category");
const { validate } = require("../middleware/validationMiddleware");

const router = express.Router();

/**
 * TEMPORARY DEBUG ROUTE - remove after fixing
 * GET /api/articles/debug/count
 */
router.get("/debug/count", async (req, res) => {
  try {
    const count = await Post.countDocuments();
    const dbName = Post.db.name;
    const sample = await Post.findOne();
    const collections = await Post.db.db.listCollections().toArray();
    res.json({
      totalCount: count,
      connectedDatabase: dbName,
      sampleDocExists: !!sample,
      sampleTitle: sample ? sample.title : null,
      allCollectionsInThisDB: collections.map((c) => c.name),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/articles/categories
 * Public endpoint to fetch all categories (for frontend display).
 */
router.get("/categories", async (req, res) => {
  try {
    // 1. Get categories from Category collection (has dashboard-set images)
    const categoryDocs = await Category.find().sort({ name: 1 });
    const catMap = new Map(categoryDocs.map((c) => [c.name, c.image || ""]));

    // 2. Also get categories from posts (so any category used in an article appears)
    const posts = await Post.find().select("category image").sort({ createdAt: -1 });
    const seen = new Set();
    const articleCats = posts
      .filter((p) => p.category && !seen.has(p.category) && seen.add(p.category))
      .map((p) => ({
        name: p.category,
        // Prefer dashboard-set image from Category collection; fallback to article thumbnail
        image: catMap.get(p.category) || p.image || "",
      }));

    // 3. Merge: categories from Category collection first (with dashboard images),
    //    then any article-derived categories not already present
    const merged = [...categoryDocs.map((c) => ({ name: c.name, image: c.image || "" }))];
    const seenNames = new Set(merged.map((c) => c.name));
    for (const ac of articleCats) {
      if (!seenNames.has(ac.name)) {
        merged.push(ac);
        seenNames.add(ac.name);
      }
    }

    res.json(merged);
  } catch (error) {
    console.error("Error fetching categories:", error.message);
    console.error("Full error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

/**
 * GET /api/articles
 * Fetch all articles, sorted by newest first.
 * Returns: array of article objects (without full content for list view)
 */
router.get("/", async (req, res) => {
  try {
    const articles = await Post.find()
      .select("-content") // Exclude content array for list view (faster)
      .sort({ createdAt: -1 }); // Newest first
    res.json(articles);
  } catch (error) {
    console.error("Error fetching articles:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * GET /api/articles/:id
 * Fetch a single article by its numericId (e.g. /api/articles/1).
 * Increments the view count by 1 using $inc.
 * Validates that the :id param is a positive integer via express-validator.
 * Returns: full article object with updated views
 */
router.get(
  "/:id",
  [
    param("id")
      .isInt({ min: 1 })
      .withMessage("Article ID must be a positive number"),
  ],
  validate,
  async (req, res) => {
    try {
      const { id } = req.params;
      const numericId = Number(id);

      // Find by numericId and increment views
      const article = await Post.findOneAndUpdate(
        { numericId },
        { $inc: { views: 1 } },
        { returnDocument: 'after' } // Return the document after update
      );

      if (!article) {
        return res.status(404).json({ message: "Article not found" });
      }

      res.json(article);
    } catch (error) {
      console.error("Error fetching article:", error.message);
      res.status(500).json({ message: "Server error" });
    }
  }
);

module.exports = router;