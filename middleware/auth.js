require("dotenv").config();
const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET;
const excludedRoutes = [
  "/api/v1/login",
  "/api/v1/register",
  "/api/v1/forgot",
  "/",
];

function authenticateJWT(req, res, next) {
  if (excludedRoutes.includes(req.url)) {
    return next();
  }

  const token = req.headers["authorization"];
  if (!token) {
    console.log("missing token");
    return res
      .status(401)
      .json({ success: false, message: "Bearer token is missing" });
  }

  try {
    console.log(token, "dde");
    const decodedToken = jwt.verify(token, secretKey);
    req.user = decodedToken;
    console.log("this is", req.user);
    next();
  } catch (error) {
    console.log(error);
    return res
      .status(403)
      .json({ success: false, message: "Invalid token, Unauthorized Access" });
  }
}
module.exports = authenticateJWT;
