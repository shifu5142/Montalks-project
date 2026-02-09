const express = require("express");
const app = express();
const port = 3001;
const db = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const cors = require("cors");
app.use(cors());

app.use(express.json());
db.connect("mongodb+srv://Tomer_SV:WARwar0102@cluster0.mnrtrei.mongodb.net/")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));
const userSchema = new db.Schema({
  id: String,
  fullName: String,
  email: String,
  password: String,
});
const User = db.model("User", userSchema);
app.post("/register", async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }
    const newUser = new User({
      id: uuidv4(),
      fullName,
      email,
      password,
    });

    await newUser.save();
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Registration failed",
    });
  }
});
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const userBool = await User.findOne({ email, password });
    if (!userBool) {
      // If no user found
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }
    const message = `Hello ${userBool.fullName}, welcome back!`;
    return res.status(200).json({ success: true, message: message });
  } catch (err) {
    console.log(err.message);
  }
});
app.listen(port, () => console.log(`server running on port ${port}`));
