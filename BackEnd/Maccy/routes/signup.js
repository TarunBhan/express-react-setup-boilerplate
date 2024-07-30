const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { base64EncodedSecretKey } = require("../constant");
const UserModel = require("../UserSchema");

const generateAcessToken = (encodeData, options) => {
  return jwt.sign(encodeData, base64EncodedSecretKey, options);
};

module.exports = (app) => {
  app.post("/api/users", async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log("email", email, "password", password);
      if (!email || !password) {
        return res.status(400).json({ msg: "Form Data is not Valid" });
      }

      //User Already Exisited
      let user = await UserModel.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: "User is Already Created" });
      }

      // Hash the password before saving to database
      const hashedPassword = await bcrypt.hash(password, 10);

      // Remove the password from the object to be encoded in the token

      // const users = UserModel.create({

      // });
      const newUser = new UserModel({
        ...req.body,
        password: hashedPassword,
      });
      const currUser = await newUser.save();

      const token = generateAcessToken(
        { userId: currUser?.id },
        { expiresIn: "1h" }
      );
      const refreshToken = generateAcessToken(
        { userId: currUser?.id },
        { expiresIn: "24h" }
      );

      res.cookie("token", [token, refreshToken]);

      return res
        .status(200)
        .json({ msg: "User Created", token: [token, refreshToken] });
    } catch (error) {
      console.error("Error in /api/users:", error);
      return res.status(500).json({ msg: "Internal Server Error" });
    }
  });
};
