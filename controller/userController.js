const bcrypt = require("bcrypt");
const User = require("../model/userSchema");

//create a user
const createUser = async (req, res, next) => {
  try {
    const { password, ...rest } = req.body;
    const hashedPassword = await bcrypt.hash(password, 11);
    const user = new User({
      ...rest,
      password: hashedPassword,
    });
    const userData = await user.save();
    if (userData._id) {
      res.status(200).json({
        message: "User Create SuccessFull",
        user: userData,
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
  createUser,
};
