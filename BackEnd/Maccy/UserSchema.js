const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    requried: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    requrie: true,
  },
});
const UserModel = mongoose.model("user", userSchema);
module.exports = UserModel;
