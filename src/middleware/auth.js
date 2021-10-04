const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const TokenJWTValidate = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res
      .status(401)
      .json({ ok: false, msg: "Invalid token authentication" });
  }
  try {
    const { uid } = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_SEED);

    const user = await User.findById(uid);

    if (!user) {
      return res.status(401).json({ ok: false, msg: "Invalid token" });
    }

    req.user = user;

    next();
  } catch (err) {
    return res.status(500).json({ ok: false, msg: err.message });
  }
};

module.exports = TokenJWTValidate;
