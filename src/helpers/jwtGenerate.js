const jwt = require("jsonwebtoken");

const jwtGenerate = (uid = "") => {
  return new Promise((resolve, reject) => {
      const payload ={uid}
    jwt.sign(
        payload,
      process.env.ACCESS_TOKEN_SECRET_SEED,
      {
        expiresIn: "4h",
      },
      (err, token) => {
        if (err) {
          reject("The token could not be created correctly");
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = {
  jwtGenerate,
};
