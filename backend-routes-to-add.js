// ============================================================
// Add this to your backend server file (after User model).
// 1. Fix the jwt require: use "jsonwebtoken" as jwt (not jwv)
// 2. Add auth middleware and movements routes BEFORE app.listen()
// 3. Update login response to include user: { fullName, email }
// ============================================================

// FIX: In your server, change this line:
//   const jwv = require("jsonwebtoken");
// To:
//   const jwt = require("jsonwebtoken");

// FIX: In login route, use jwt (not jwv) and return user in response:
//   const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: "2h" });
//   res.status(200).json({
//     success: true,
//     message: `Hello ${user.fullName}, welcome back!`,
//     token,
//     user: { fullName: user.fullName, email: user.email },
//   });

// --- Auth middleware (add after User model) ---
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "Token required" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
}

// --- GET /api/movements - get current user's movements array ---
app.get("/api/movements", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("movements");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    const movements = Array.isArray(user.movements) ? user.movements : [];
    res.status(200).json({ success: true, movements });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to get movements" });
  }
});

// --- PUT /api/movements - update current user's movements array ---
app.put("/api/movements", authMiddleware, async (req, res) => {
  try {
    const { movements } = req.body;
    if (!Array.isArray(movements)) {
      return res.status(400).json({ success: false, message: "movements must be an array" });
    }
    const numbers = movements.map((n) => Number(n)).filter((n) => !Number.isNaN(n));
    await User.findByIdAndUpdate(req.userId, { movements: numbers });
    res.status(200).json({ success: true, movements: numbers });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to update movements" });
  }
});
