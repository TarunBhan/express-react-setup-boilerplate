// const bcrypt = require("bcrypt");
// const password = "tarunbhansingh";
// bcrypt.genSalt(10, (err, salt) => {
//   //hasing the password
//   bcrypt.hash(password, salt, (err, hash) => {
//     console.log(hash);
//   });
// });
const bcrypt = require("bcrypt");

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
const plainPassword = "taurnnbhansdksd";
generateEncryptedPassword(plainPassword)
  .then((hashedPassword) => {
    console.log("Encrypted Password:", hashedPassword);

    // Compare the plain password with the hashed password
    comparePassword(plainPassword, hashedPassword)
      .then((isMatch) => {
        console.log("Do passwords match?", isMatch);
      })
      .catch((error) => {
        console.error("Error during password comparison:", error);
      });
  })
  .catch((error) => {
    console.error("Error during password generation:", error);
  });
