
const express = require("express");

const authController = require('../controllers/authController');
const {signupValidation, loginValidation} = require("../validations/authValidation");
const validationMiddleware = require("../middleware/validationMiddleware");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/signup", signupValidation, validationMiddleware, authController.signup);
router.post("/login", loginValidation, validationMiddleware, authController.login);
router.get("/me", authMiddleware, authController.getUserProfile);

module.exports = router;