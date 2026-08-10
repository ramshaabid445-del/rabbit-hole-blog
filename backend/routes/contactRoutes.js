const express = require("express");
const { Resend } = require("resend");
const { body } = require("express-validator");
const Contact = require("../models/Contact");
const { validate } = require("../middleware/validationMiddleware");

const router = express.Router();
const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * POST /api/contact
 * Submit a contact form message.
 * Validates all fields via express-validator, then sends an email and saves to DB.
 */
router.post(
  "/",
  [
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
    body("subject")
      .trim()
      .notEmpty()
      .withMessage("Subject is required")
      .isLength({ max: 200 })
      .withMessage("Subject must be under 200 characters"),
    body("message")
      .trim()
      .notEmpty()
      .withMessage("Message is required")
      .isLength({ min: 10, max: 5000 })
      .withMessage("Message must be between 10 and 5000 characters"),
  ],
  validate,
  async (req, res) => {
    try {
      const { name, email, subject, message } = req.body;

      if (!process.env.RESEND_API_KEY) {
        console.error("Missing Resend API key in env");
        return res.status(500).json({
          message: "Email not configured. Contact admin.",
        });
      }

      const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
          <h2 style="color: #111a2b; margin-bottom: 20px;">New Contact Form Submission</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #6d74a1;">Name</td>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; color: #111a2b;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #6d74a1;">Email</td>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; color: #111a2b;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #6d74a1;">Subject</td>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; color: #111a2b;">${subject}</td>
            </tr>
            <tr>
              <td style="padding: 10px; vertical-align: top; font-weight: 600; color: #6d74a1;">Message</td>
              <td style="padding: 10px; color: #111a2b; line-height: 1.6;">${message}</td>
            </tr>
          </table>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
          <p style="font-size: 12px; color: #9ca3af; text-align: center;">
            Sent from The Rabbit Hole blog contact form
          </p>
        </div>
      `;

      try {
        const { data, error } = await resend.emails.send({
          from: "The Rabbit Hole <onboarding@resend.dev>",
          to: "ramshaabid752@gmail.com",
          reply_to: email,
          subject: `[Blog Contact] ${subject}`,
          html,
        });

        if (error) {
          console.error("=== EMAIL SEND ERROR ===", error);
          return res.status(500).json({ message: "Failed to send email. " + error.message });
        }

        console.log("Email sent successfully! ID:", data?.id);
      } catch (mailError) {
        console.error("=== EMAIL SEND ERROR ===", mailError.message);
        return res.status(500).json({ message: "Failed to send email. " + mailError.message });
      }

      // Only save to DB if email was sent successfully
      try {
        const newContact = new Contact({ name, email, subject, message });
        await newContact.save();
        console.log("Contact saved to DB");
      } catch (dbError) {
        console.error("DB save error (email was sent):", dbError.message);
      }

      res.status(201).json({
        message: "Message sent successfully! We'll get back to you soon.",
      });
    } catch (error) {
      console.error("=== CONTACT ERROR ===");
      console.error("Error:", error.message);
      res.status(500).json({ message: "Something went wrong, please try again" });
    }
  }
);

module.exports = router;