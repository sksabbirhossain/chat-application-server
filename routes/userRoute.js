const express = require("express");
const router = express.Router();

//
const { createUser } = require("../controller/userController");

//CREATE A USER
router.post("/register", createUser);

module.exports = router;
