const mongoose = require("mongoose");
const brcypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
});
userSchema.pre("save", async function (next) {
  const salt = await brcypt.genSalt();
  this.password = await brcypt.hash(this.password, salt);
});
module.exports = mongoose.model("Users", userSchema);
