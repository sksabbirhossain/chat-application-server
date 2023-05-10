const express = require("express");
const router = express.Router();

//
const { createUser, loginUser } = require("../controller/userController");

//CREATE A USER
router.post("/register", createUser);
router.post("/login", loginUser);

module.exports = router;
