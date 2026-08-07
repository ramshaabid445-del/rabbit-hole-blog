/**
 * validationMiddleware.js
 * Shared Express-Validator setup for consistent request validation.
 *
 * Exposes:
 *  - `validate` — middleware that runs validation rules and returns errors
 *  - `isValidObjectId` — chainable validator to check MongoDB ObjectId format
 */

const { validationResult } = require("express-validator");
const mongoose = require("mongoose");

/**
 * Middleware that checks validation results after the rules have run.
 * If there are errors, returns a 400 response with all error messages.
 */
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: errors.array()[0].msg,
      errors: errors.array(),
    });
  }
  next();
};

/**
 * Chainable validator: checks if the value is a valid MongoDB ObjectId.
 * Usage: param("id").custom(isValidObjectId).withMessage("Invalid ID format")
 */
const isValidObjectId = (value) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    throw new Error("Invalid ObjectId format");
  }
  return true;
};

module.exports = { validate, isValidObjectId };