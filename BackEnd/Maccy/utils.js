const bcrypt = require("bcrypt");
const password1 = "123434";
const password2 = "123434";
let encryptedHash = "";
const generateEncryptedPassword = async (password) => {
  try {
    return await bcrypt.hash(password1, 10);
  } catch (error) {
    console.log(error);
  }
};
const comparePassword = async (plainPassword, hashedPassword) => {
  try {
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
    return isMatch;
  } catch (e) {
    console.log(e);
  }
};
generateEncryptedPassword(password1)
  .then((hashedPassword1) => {
    comparePassword(password2, hashedPassword1).then((isMatch) => {
      console.log({ isMatch });
    });
  })
  .catch((error) => {
    console.log(error);
  });
