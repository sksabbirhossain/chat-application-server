const mongoose = require("mongoose");

const conversationsSchema = mongoose.Schema({
  creator: {
    type: mongoose.Types.ObjectId,
    raf: "User",
  },
  participant: {
    type: mongoose.Types.ObjectId,
    raf: "User",
  },
  last_updated: {
    type: Date,
    default: Date.now,
  },
  last_message: {
    type: String,
    required: true,
  },
});

const Conversation = mongoose.model("Conversation", conversationsSchema);

module.exports = Conversation;
