const UserModel = require("../Models/UserModels");
const jwt = require("jsonwebtoken");
const { response } = require("express");
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "Aasim", {
    expiresIn: maxAge,
  });
};
module.exports.register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.create({ email, password });
    const token = createToken(user._id);
    response.cookie("jwt", token, {
      withCredentials: true,
      httpOnly: false,
      maxAge: maxAge * 1000,
    });
    response.status(201).json({ user: user._id, created: true });
  } catch (err) {
    console.log(err);
  }
};
module.exports.login = async (req, res, next) => {};
