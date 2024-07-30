// const bcrypt = require("bcrypt");
// const password = "tarunbhansingh";
// bcrypt.genSalt(10, (err, salt) => {
//   //hasing the password
//   bcrypt.hash(password, salt, (err, hash) => {
//     console.log(hash);
//   });
// });
const bcrypt = require("bcrypt");
const UserModel = require("../UserSchema");
const jwt = require("jsonwebtoken");

const generateEncryptedPassword = async (password) => {
  try {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  } catch (error) {
    console.error("Error generating encrypted password:", error);
    throw error;
  }
};

const comparePassword = async (plainPassword, hashedPassword) => {
  try {
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
    return isMatch;
  } catch (error) {
    console.error("Error comparing passwords:", error);
    throw error;
  }
};

// Example usage

module.exports = (app) => {
  app.use("/api/login", async (req, res) => {
    const { email, password } = req?.body;
    try {
      let user = await UserModel.findOne({ email });
      console.log(user);
      if (!user) {
        res.status(400).json({ msg: "User Don't Text" });
      } else {
        generateEncryptedPassword(password)
          .then((hashedPassword) => {
            console.log("Encrypted Password:", hashedPassword);

            // Compare the plain password with the hashed password
            comparePassword(password, hashedPassword)
              .then((isMatch) => {
                if (!isMatch) {
                  res.status(400).json({ msg: "Password is Incorrected" });
                }
                const token = jwt.sign({ userId: user._id }, "secretKey", {
                  expiresIn: "1h",
                });
                res.json({ token, user: { userId: user._id, email: email } });
              })
              .catch((error) => {
                res
                  .status(500)
                  .json({ msg: "Something Went Wrong Please try Again" });
              });
          })
          .catch((error) => {
            console.error("Error during password generation:", error);
          });
      }
    } catch (e) {
      res.status(500).json({ msg: "Interval Server Error" });
      console.log("erorr", e);
    }
  });
};
