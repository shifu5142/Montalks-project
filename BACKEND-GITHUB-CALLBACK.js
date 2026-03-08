/**
 * Replace your existing app.get("/auth/github/callback", ...) with this.
 * It finds or creates the user in MongoDB and issues a JWT (same as /login)
 * so the frontend can show the logged-in view and API calls work.
 */

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

app.get("/auth/github/callback", async (req, res) => {
  const code = req.query.code;
  if (!code) return res.status(400).send("No code provided");

  const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";
  const JWT_SECRET = process.env.JWT_SECRET;

  try {
    const tokenResponse = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      },
      { headers: { Accept: "application/json" } }
    );

    const accessToken = tokenResponse.data.access_token;
    if (!accessToken) {
      return res.redirect(`${FRONTEND_URL}/login?error=github_failed`);
    }

    const userResponse = await axios.get("https://api.github.com/user", {
      headers: { Authorization: `token ${accessToken}` },
    });

    const gh = userResponse.data;
    const fullName = (gh.name || gh.login || "GitHub User").trim();
    const email = (gh.email || `${gh.login}@users.noreply.github.com`).trim().toLowerCase();

    // Find or create user in DB (so we have an _id for the JWT)
    let user = await User.findOne({ email });
    if (!user) {
      const placeholderPassword = await bcrypt.hash("oauth-" + Date.now(), 10);
      user = await User.create({
        fullName,
        email,
        password: placeholderPassword,
        movements: [],
      });
    }

    // Issue JWT (same format as /login) so frontend and API work
    const token = jwt.sign(
      { id: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: "2h" }
    );

    const userPayload = { fullName: user.fullName, email: user.email };

    const query = new URLSearchParams({
      token,
      user: JSON.stringify(userPayload),
    });
    res.redirect(`${FRONTEND_URL}/auth/github/callback?${query.toString()}`);
  } catch (err) {
    console.error(err);
    res.redirect(`${FRONTEND_URL}/login?error=github_failed`);
  }
});
