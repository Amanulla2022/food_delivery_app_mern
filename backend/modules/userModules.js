const mongoose = require("mongoose");
const hashThePassword = require("../middleware/middleware");

// user schema creation
const userSchema = new mongoose.Schema(
  {
    name: String,
    username: String,
    password: String,
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", hashThePassword);

module.exports = mongoose.model("User", userSchema);
