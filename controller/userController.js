const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//
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

//login a user
const loginUser = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email });
    if (user && user._id) {
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (isValidPassword) {
        //prepare the user object to generate token
        const userObject = {
          name: user.name,
          email: user.email,
          id: user._id,
        };

        //generate token
        const token = jwt.sign(userObject, process.env.JWT_SECTET, {
          expiresIn: 86400000,
        });

        res.status(200).json({
          message: "User Login successfull",
          data: {
            user: user,
            accessToken: token,
          },
        });
      } else {
        res.status(500).json({
          message: "something worng!",
        });
      }
    } else {
      res.status(500).json({
        message: "something went worng!",
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
  loginUser,
};
