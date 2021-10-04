const User = require("../models/userModel");

const emailExist = async (email = "") => {
  const emailDB = await User.findOne({ email });
  
  if (emailDB) {
    throw new Error(`The email: ${email} already exist`);
  }
};

module.exports = {
  emailExist,
};
