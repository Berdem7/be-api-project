const jwt = require("jsonwebtoken");
const config = process.env;

const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];
  if (!token) {
    return res
      .status(403)
      .json({ success: false, message: "Please enter the user token" });
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res
      .status(401)
      .json({ success: false, message: "User token is not correct or active" });
  }
  return next();
};

module.exports = verifyToken;
