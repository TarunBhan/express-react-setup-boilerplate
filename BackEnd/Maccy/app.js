const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bcrypt = require("bcrypt");
const PORT = 3001;
const UserModel = require("./UserSchema");
const { cookieJwtAuth } = require("./cookieJwtAuth");
const setSignupRoute = require("./routes/signup");
const setLoginRoute = require("./routes/login");
const { base64EncodedSecretKey } = require("./constant");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/task-manager", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("mongodb-connected");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

// Function to encode a string to base64 URL-safe format
// const base64UrlEncode = (str) => {
//   return Buffer.from(str)
//     .toString("base64")
//     .replace(/\+/g, "-")
//     .replace(/\//g, "_")
//     .replace(/=+$/, "");
// };

// Endpoint to create a user and generate a token

setSignupRoute(app);
setLoginRoute(app);

const generateAccessToken = (userId, options) => {
  return jwt.sign({ userId }, "secretKey", options);
};

const verifyToken = (req, res, next) => {
  const authToken = req?.header("x-auth-token");
  let accessTokens = "";
  if (!authToken) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }
  try {
    jwt.verify(authToken, base64EncodedSecretKey, (err, user) => {
      console.log(user);
      if (err) {
        console.log(err, "error>>>>>>");
        if (err.name === "TokenExpiredError") {
          return res.status(403).json({ message: "Token expired" });
        }
        return res.status(403).json({ message: "Forbidden" });
      }
      accessTokens =
        generateAccessToken(user?._id, {
          expiresIn: "1h",
        }) + " ";
      accessTokens += generateAccessToken(user?._id, {
        expiresIn: "24h",
      });
      req.user = user;
      req.authToken = accessTokens;
      next();
    });
  } catch (error) {
    console.log("error:", error);
  }
};

app.get("/profile", verifyToken, async (req, res) => {
  try {
    const userInDB = await UserModel.findById(req?.user?.userId).select(
      "-password"
    );
    console.log(userInDB);
    if (!userInDB) {
      res.status(404).json({ msg: "User Not Found" });
    }
    res.json({ user: userInDB, accessTokens: req?.authToken });
  } catch (e) {
    console.log("error:>>>>", e);
    res.status(500).json({ msg: "Server Internal Error" });
  }
});

//Endpoint With Secured Data
app.post("/", cookieJwtAuth, (req, res) => {
  console.log(req?.user);
  res.status(200);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
