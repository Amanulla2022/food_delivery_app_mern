const userSchema = require("../modules/userModules");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// registering as a user
const registerUser = async (req, res) => {
  // taking name, username and password from body
  const { name, username, password } = req.body;

  try {
    // checkhing user already exists
    const existingUser = await userSchema.findOne({ username });
    // if exists user already exists
    if (existingUser) {
      return res.status(400).json({ message: "User already exists!" });
    }

    // if he/she is new user
    const newUser = new userSchema({
      name,
      username,
      password,
      role: "user",
    });

    // saving new user
    await newUser.save();

    // return success msg
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    // return error msg
    console.error("Error while registering user:", error);
    res
      .status(500)
      .json({ message: "Error while registering user", error: error.message });
  }
};

// registering as admin
const registerAdmin = async (req, res) => {
  // taking name, username and password from body
  const { name, username, password } = req.body;

  try {
    // checkhing admin already exists
    const existingAdmin = await userSchema.findOne({ role: "admin" });
    // if exists admin already exists can't create a admin again
    if (existingAdmin) {
      return res.status(403).json({
        message:
          "Admin already exists! You can't be a second admin, try as a user.",
      });
    }

    // create admin
    const newAdmin = new userSchema({
      name,
      username,
      password,
      role: "admin",
    });

    // save admin
    await newAdmin.save();
    // return success msg
    res.status(201).json({ message: "Admin registered successfully" });
  } catch (error) {
    // return error msg
    console.error("Error while registering admin:", error);
    res
      .status(500)
      .json({ message: "Error while registering admin", error: error.message });
  }
};

// loging user
const loginUser = async (req, res) => {
  // taking username password from body
  const { username, password } = req.body;

  try {
    // find username already exist or no
    const user = await userSchema.findOne({ username, role: "user" });
    if (!user) {
      console.log("User not found");
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // if passwrd match
    const isMatch = await bcrypt.compare(password, user.password);

    // if password is wrong return msg
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // generating token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    // return success msg
    res.status(200).json({ token, message: "User logged in successfully" });
  } catch (error) {
    // return error msg
    console.error("Error while logging in user:", error);
    res
      .status(500)
      .json({ message: "Error while logging in user", error: error.message });
  }
};

// loging admin
const loginAdmin = async (req, res) => {
  // taking username password from body
  const { username, password } = req.body;

  try {
    // find username already exist or no
    const admin = await userSchema.findOne({ username, role: "admin" });
    if (!admin) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // if passwrd match
    const isMatch = await bcrypt.compare(password, admin.password);
    // if password is wrong return msg
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // generating token
    const token = jwt.sign(
      { userId: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    // return success msg
    res.status(200).json({ token, message: "Admin logged in successfully" });
  } catch (error) {
    // return error msg
    console.error("Error while logging in admin:", error);
    res
      .status(500)
      .json({ message: "Error while logging in admin", error: error.message });
  }
};

module.exports = { registerUser, registerAdmin, loginUser, loginAdmin };
