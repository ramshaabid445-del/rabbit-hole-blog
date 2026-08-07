const express = require("express");
const { body, param } = require("express-validator");
const Subscriber = require("../models/Subscriber");
const { validate } = require("../middleware/validationMiddleware");

const router = express.Router();

/**
 * POST /api/subscribe
 * Subscribe a user's email to the newsletter.
 * 
 * Request body: { email: string }
 * 
 * Responses:
 *   201 - Successfully subscribed
 *   400 - Email already exists or invalid input
 *   500 - Server error
 */
router.post(
  "/",
  [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Valid email is required")
      .normalizeEmail(),
  ],
  validate,
  async (req, res) => {
    try {
      const email = req.body.email.toLowerCase().trim();

      // Check if email already exists in database
      const existingSubscriber = await Subscriber.findOne({ email });
      if (existingSubscriber) {
        return res.status(400).json({ message: "Email already subscribed" });
      }

      // Create and save new subscriber
      const newSubscriber = new Subscriber({ email });
      await newSubscriber.save();

      res.status(201).json({ message: "Subscribed successfully!" });
    } catch (error) {
      console.error("Subscribe error:", error.message);
      res.status(500).json({ message: "Server error. Please try again later." });
    }
  }
);

/**
 * POST /api/subscribe/save-article
 * Save/bookmark an article for a subscriber.
 * 
 * Request body: { email, articleId }
 * 
 * Responses:
 *   200 - Article saved/unsaved
 *   400 - Missing fields or subscriber not found
 *   500 - Server error
 */
router.post(
  "/save-article",
  [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Valid email is required")
      .normalizeEmail(),
    body("articleId")
      .notEmpty()
      .withMessage("Article ID is required"),
  ],
  validate,
  async (req, res) => {
    try {
      const { email, articleId } = req.body;

      const subscriber = await Subscriber.findOne({ email: email.toLowerCase().trim() });
      if (!subscriber) {
        return res.status(400).json({ message: "Subscriber not found. Please subscribe first." });
      }

      // Check if article is already saved
      const alreadySaved = subscriber.savedArticles.some(
        (id) => id.toString() === articleId
      );

      if (alreadySaved) {
        // Remove from saved (toggle off)
        subscriber.savedArticles = subscriber.savedArticles.filter(
          (id) => id.toString() !== articleId
        );
        await subscriber.save();
        return res.json({ message: "Article removed from saved", saved: false });
      } else {
        // Add to saved
        subscriber.savedArticles.push(articleId);
        await subscriber.save();
        return res.json({ message: "Article saved!", saved: true });
      }
    } catch (error) {
      console.error("Save article error:", error.message);
      res.status(500).json({ message: "Server error" });
    }
  }
);

/**
 * GET /api/subscribe/saved-articles/:email
 * Fetch all saved articles for a subscriber (populated with full Post details).
 */
router.get(
  "/saved-articles/:email",
  [
    param("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Valid email is required"),
  ],
  validate,
  async (req, res) => {
    try {
      const email = req.params.email.toLowerCase().trim();

      const subscriber = await Subscriber.findOne({ email })
        .populate("savedArticles");

      if (!subscriber) {
        return res.status(400).json({ message: "Subscriber not found" });
      }

      res.json(subscriber.savedArticles);
    } catch (error) {
      console.error("Fetch saved articles error:", error.message);
      res.status(500).json({ message: "Server error" });
    }
  }
);

module.exports = router;