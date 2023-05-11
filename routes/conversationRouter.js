const express = require("express");
const router = express.Router();

//
const {
  getConversations,
  addConversation,
} = require("../controller/conversationController");
const checkedLogin = require("../middleware/checkedLogin");

router.get("/", checkedLogin, getConversations);
router.post("/add", checkedLogin, addConversation);

module.exports = router;
