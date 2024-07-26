const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
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
