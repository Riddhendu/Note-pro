const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.SIGNATURE, {
    expiresIn: "45d",
  });
};
module.exports = generateToken;
