const userService = require("../services/userService");

async function signup(req, res) {
  const { name, email, password } = req.body;

  const user = await userService.signup(name, email, password);

  res.status(201).json({
    message: "User created successfully",
    user,
  });
}

async function login(req, res) {
  const { email, password } = req.body;

  const data = await userService.login(email, password);

  res.status(200).json({
    message: "Login successful",
    token: data.token,
    user: data.user,
  });
}

async function getUserProfile(req, res) {
  const user = await userService.getUserByEmail(req.user.email);

  res.status(200).json(user);
}

module.exports = {
  signup,
  login,
  getUserProfile
};
