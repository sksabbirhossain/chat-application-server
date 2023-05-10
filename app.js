const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();
app.use(cors());
dotenv.config();

const port = process.env.PORT || 5000;

//route
app.get("/", (req, res) => {
  res.send("Hello world");
});

//listen app
app.listen(port, () => {
  console.log(`listening to port on ${port}`);
});
