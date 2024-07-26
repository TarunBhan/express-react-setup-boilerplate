const jwt = require("jsonwebtoken");
exports.cookieJwtAuth = (res, req, next) => {
  const token = req.cookies.token;
  try {
    const user = jwt.verify(token, "secretKey");
    req.user = user;
  } catch (e) {
    res.clearCookie("token");
    res.status(401).json({ msg: "Unauthorised error" });
  }
};
