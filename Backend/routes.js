const express = require("express");
const dotenv = require("dotenv");
//------------------------------Internal ROUTES---------------------------\\
const userRoutes = require("./API/Controllers/UserController");
//------------------------------Internal ROUTES---------------------------\\
dotenv.config();
const app = express();
app.use(
   express.json({
      limit: "5mb",
   })
);

//------------------------------External ROUTES---------------------------\\
app.use("/api/user", userRoutes);
//------------------------------External ROUTES---------------------------\\

module.exports.app = app;
