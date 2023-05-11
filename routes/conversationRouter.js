const express = require("express");
const router = express.Router();

//
const {
  getConversations,
  addConversation,
} = require("../controller/conversationController");

router.get("/", getConversations);
router.post("/add", addConversation);

module.exports = router;
