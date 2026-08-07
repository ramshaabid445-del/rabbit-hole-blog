/**
 * resetAdminPassword.js
 * Run this script to reset the admin password.
 * Usage: node resetAdminPassword.js
 */
const mongoose = require("mongoose");
const dns = require("dns");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

// Force Node.js to use Google DNS servers
dns.setServers(["8.8.8.8", "8.8.4.4"]);

// Load environment variables
require("dotenv").config();

const resetAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    // Find all admin users
    const users = await User.find({});
    console.log("\n📋 All users in database:");
    users.forEach((u) => {
      console.log(`   - ID: ${u._id}`);
      console.log(`     Name: ${u.name}`);
      console.log(`     Email: ${u.email}`);
      console.log(`     Password hash: ${u.password.substring(0, 30)}...`);
      console.log("");
    });

    if (users.length === 0) {
      console.log("❌ No users found in database!");
      console.log("   Run 'node createAdmin.js' first to create an admin user.");
      await mongoose.disconnect();
      return;
    }

    // Reset password for the first user (or all users)
    const newPassword = "Admin@123";
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    for (const user of users) {
      user.password = hashedPassword;
      await user.save();
      console.log(`✅ Password reset for: ${user.email}`);
      console.log(`   New password: ${newPassword}`);
    }

    // Verify the password works
    const testUser = await User.findOne({});
    const isMatch = await bcrypt.compare(newPassword, testUser.password);
    console.log("\n🧪 Password verification test:");
    console.log(`   Password "Admin@123" matches: ${isMatch ? "✅ YES" : "❌ NO"}`);

    await mongoose.disconnect();
    console.log("\n✅ Done! You can now log in with password: Admin@123");
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
};

resetAdmin();