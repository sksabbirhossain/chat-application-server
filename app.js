const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

//
const userRouter = require("./routes/userRoute");
const conversationRouter = require("./routes/conversationRouter");

const app = express();

//common middlemare
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
dotenv.config();

//static folder
app.use("/uploads", express.static("./uploads/profile"));

const port = process.env.PORT || 5000;

//database connection
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("database connection successfully"))
  .catch((err) => console.log(err));

//route
app.use("/api/user", userRouter);
app.use("/api/conversations", conversationRouter);

//error handler
app.use((err, req, res, next) => {
  if (res.headersSent) {
    next("There was a problem!");
  } else {
    if (err.message) {
      res.status(500).json(err.message);
    } else {
      res.status(500).json("There was an error!");
    }
  }
});

//listen app
app.listen(port, () => {
  console.log(`listening to port on ${port}`);
});
