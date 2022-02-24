const { app } = require("./routes");

const port = process.env.PORT || 5000;
const server = app.listen(port, () => console.log("Server Up on port " + port));
