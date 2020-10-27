const express = require("express");
const router = express.Router();
const UserController = require("../controllers/User");
const checkAuth = require("../middleware/checkAuth");
router.post("/signup", UserController.user_signup);
router.post("/login", UserController.user_login);
router.get("/current", checkAuth, UserController.user_current);

module.exports = router ; 
