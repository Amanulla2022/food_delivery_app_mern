const express = require("express");
const {
  registerUser,
  registerAdmin,
  loginUser,
  loginAdmin,
} = require("../controllers/userController");

const router = express.Router();
// user registration api POST : api/user/register
router.post("/user/register", registerUser);

// user registration api POST : api/user/register
router.post("/admin/register", registerAdmin);

// user registration api POST : api/user/login
router.post("/user/login", loginUser);

// user registration api POST : api/admin/login
router.post("/admin/login", loginAdmin);

module.exports = router;
