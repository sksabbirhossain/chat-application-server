const express = require("express");
const router = express.Router();

//
const { createUser, loginUser, getAllUser } = require("../controller/userController");
const upload = require("../middleware/singleFileUpload");

//CREATE A USER
router.post("/register", upload.single("profilePic"), createUser);
router.get("/",  getAllUser);
router.post("/login", loginUser);

module.exports = router;
