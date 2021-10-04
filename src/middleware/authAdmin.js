const { User } = require("../models");

const authAdmin = async (req, res, next) => {
  if (!req.user) {
    return res.status(500).json({
      msg: "First validate using Token.",
    });
  }
  const { name, id } = req.user;

  const user = await User.findOne({
    _id: id,
  });

  if (user.role !== 1) {
    return res
      .status(400)
      .json({ ok: false, msg: `User ${name} doesn't have Admin role.` });
  }
  next();
};

module.exports = authAdmin;
