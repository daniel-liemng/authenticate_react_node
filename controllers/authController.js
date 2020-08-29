const User = require("../models/User");
const jwt = require("jsonwebtoken");

// handle error
const handleErrors = (err) => {
  // console.log(err.message, err.code);
  let errors = { email: "", password: "" };

  // incorrect email - login
  if (err.message === "incorrect email") {
    errors.email = "that email is not registered";
  }

  // incorrect password - login
  if (err.message === "incorrect password") {
    errors.password = "that password is incorrect";
  }

  // duplicate error code - signup
  if (err.code === 11000) {
    errors.email = "that email is already registered";
    return errors;
  }

  // validation errors - signup
  if (err.message.includes("user validation failed")) {
    // console.log(Object.values(err.errors));
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

// create token
const maxAge = 60 * 60 * 24 * 3;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: maxAge });
};

module.exports.signup = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });
    // jwt
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user._id });
  } catch (err) {
    // console.log(err);
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    // jwt
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};
