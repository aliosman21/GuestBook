const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
//------------------------------Internal ROUTES---------------------------\\
const userRoutes = require("./API/Controllers/UserController");
const messageRoutes = require("./API/Controllers/MessageController");
//------------------------------Internal ROUTES---------------------------\\
dotenv.config();
const app = express();
app.use(cors());
app.use(
   express.json({
      limit: "5mb",
   })
);

//------------------------------External ROUTES---------------------------\\
app.use("/api/user", userRoutes);
app.use("/api/message", messageRoutes);
//------------------------------External ROUTES---------------------------\\

module.exports.app = app;
