const jwt = require("jsonwebtoken");

const SECRET = "secret";

const parseAuthorization = authHeader => {
  const splitAuth = authHeader.split("Bearer");
  if (splitAuth[1]) {
    return splitAuth[1].trim();
  }
  return "";
};

const isAuthenticated = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(403).json({ status: 403, message: "FORBIDDEN" });
  }
  const token = parseAuthorization(authHeader);
  if (token) {
    try {
      jwt.verify(token, SECRET);
      return next();
    } catch (e) {
      return res
        .status("401")
        .json({ success: false, message: "UNAUTHORIZED" });
    }
  } else {
    return res.status(403).json({
      status: 403,
      message: "FORBIDDEN"
    });
  }
};

module.exports = isAuthenticated;
