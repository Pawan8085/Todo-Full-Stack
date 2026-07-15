const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");
const AppError = require("../utils/AppError");
const jwt = require("jsonwebtoken")

async function signup(name, email, password) {

 
  // Check if user already exist  
  const existingUser = await userModel.findUserByEmail(email);

  if (existingUser) {
    throw new AppError("Email already exists", 409);
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user
  const userId = await userModel.createUser(
    name,
    email,
    hashedPassword
  );

  
  return {
    id: userId,
    name,
    email,
  };
}

async function login(email, password) {
 
  const user = await userModel.findUserByEmail(email);

  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

 
  const isPasswordValid = await bcrypt.compare(
    password,
    user.password
  );

  if (!isPasswordValid) {
    throw new AppError("Invalid email or password", 401);
  }

  // Generate JWT key
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  };
}

async function getUserByEmail(email){

  const user = await userModel.getUserByEmail(email);

  if(!user){
    throw new AppError("User not found", 404);
  }


  return {
     id: user.id,
      name: user.name,
      email: user.email,
  }
}

module.exports = {
  signup,
  login,
  getUserByEmail
};