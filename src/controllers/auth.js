const { User } = require("../models");
const bcrypt = require("bcrypt");

const { jwtGenerate } = require("../helpers/jwtGenerate");

const authController = {
  // <---------------- CREATE A USER ON PAGE ------------------>
  register: async (req, res) => {
    const { name, email, password } = req.body;
    const newUser = new User({ name, email, password });
    newUser.password = await bcrypt.hash(password, 10);
    await newUser.save();
    const token = await jwtGenerate(newUser._id);
    res.status(201).json({ msg: "User was created successfully!", token });
  },

  // <---------------- LOGIN A USER ------------------>
  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user)
        return res
          .status(400)
          .json({ msg: "User or password are not correct." });

      if (user.state === false) {
        return res
          .status(401)
          .json({
            msg: "Your account is inactive, please talk with the administrator.",
          });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res
          .status(400)
          .json({ msg: "User or password are not correct." });
      }
      const token = await jwtGenerate(user._id);
      res.status(200).json({ token });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  create_user: async (req, res) => {
    const { name, email, password } = req.body;
    const newUser = new User({ name, email, password });
    newUser.password = await bcrypt.hash(password, 10);
    await newUser.save();
    res.status(201).json({ msg: "User was created successfully!" });
  },
};

module.exports = authController;
