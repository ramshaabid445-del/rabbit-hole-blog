/**
 * createAdmin.js
 * Run this script once to create an admin user in the database.
 * Credentials are read from the .env file (ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_NAME).
 * Usage: node createAdmin.js
 */
const mongoose = require("mongoose");
const dns = require("dns");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

// Force Node.js to use Google DNS servers (same as db.js)
dns.setServers(["8.8.8.8", "8.8.4.4"]);

// Load environment variables
require("dotenv").config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    // Read admin credentials from .env
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    const adminName = process.env.ADMIN_NAME || "Admin";

    if (!adminEmail || !adminPassword) {
      console.error("❌ ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env");
      process.exit(1);
    }

    // Check if admin already exists
    const existing = await User.findOne({ email: adminEmail });
    if (existing) {
      console.log("⚠️ Admin user already exists with email:", adminEmail);
      console.log("   Name:", existing.name);
      await mongoose.disconnect();
      return;
    }

    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    const admin = new User({
      name: adminName,
      email: adminEmail,
      password: hashedPassword,
    });

    await admin.save();
    console.log("✅ Admin user created successfully!");
    console.log("   Email:", adminEmail);
    console.log("⚠️  Please change the password after first login!");

    await mongoose.disconnect();
    console.log("✅ Disconnected from MongoDB");
  } catch (error) {
    console.error("❌ Error creating admin:", error.message);
    process.exit(1);
  }
};

createAdmin();