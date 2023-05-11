const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

//
const userRouter = require("./routes/userRoute");
const conversationRouter = require("./routes/conversationRouter");

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

const port = process.env.PORT || 5000;

//database connection
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("database connection successfully"))
  .catch((err) => console.log(err));

//route
app.use("/api/user", userRouter);
app.use("/api/conversations", conversationRouter);

//listen app
app.listen(port, () => {
  console.log(`listening to port on ${port}`);
});
