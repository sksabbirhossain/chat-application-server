const Conversation = require("../model/conversationsSchema");

//get  conversations by user email
const getConversations = async (req, res, next) => {
  try {
    const loginUserId = req.query.userid;
    const conversations = await Conversation.find({
      $or: [{ creator: loginUserId }, { participant: loginUserId }],
    }).sort({ last_updated: -1 });
    res.status(200).json({
      conversations,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

//add conversation
const addConversation = async (req, res, next) => {
  try {
    const conversation = new Conversation(req.body);
    const data = await conversation.save();
    if (data._id) {
      res.status(200).json({
        message: "Conversation Create SuccessFull",
        conversation: data,
      });
    } else {
      res.status(500).json({
        message: "There was an error!",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  getConversations,
  addConversation,
};
