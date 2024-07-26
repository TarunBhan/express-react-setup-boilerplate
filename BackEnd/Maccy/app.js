const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const PORT = 3001;
const UserModel = require("./UserSchema");
const { cookieJwtAuth } = require("./cookieJwtAuth");

const app = express();
app.use(express.json());

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
const base64UrlEncode = (str) => {
  return Buffer.from(str)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
};

const base64EncodedSecretKey = Buffer.from("secretKey").toString("base64");

// Endpoint to create a user and generate a token
app.post("/api/users", async (req, res) => {
  try {
    const { firstName, lastName, password } = req.body;
    if (!firstName || !lastName || !password) {
      return res.status(400).json({ msg: "Form Data is not Valid" });
    }

    // Hash the password before saving to database
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await UserModel.create({
      firstName,
      lastName,
      password: hashedPassword,
    });

    // Remove the password from the object to be encoded in the token
    const userWithoutPassword = { firstName, lastName };

    const token = jwt.sign(userWithoutPassword, base64EncodedSecretKey, {
      expiresIn: "1h",
    });

    // Encode the token in base64 URL-safe format
    const encodedToken = base64UrlEncode(token);

    res.cookie("token", encodedToken, {
      httpOnly: true,
    });

    return res.status(200).json({ msg: "User Created", token: encodedToken });
  } catch (error) {
    console.error("Error in /api/users:", error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
});

//Endpoint With Secured Data
app.post("/", cookieJwtAuth, (req, res) => {
  console.log(req?.user);
  res.status(200).jsonp({});
  e;
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
