const express = require("express");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
app.use(
   express.json({
      limit: "5mb",
   })
);

const port = process.env.PORT || 5000;

const server = app.listen(port, () => console.log("Server Up on port " + port));