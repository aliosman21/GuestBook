const jwt = require("jsonwebtoken");

module.exports.getJwtToken = ({id, email}) => {
   return jwt.sign({ id,email }, process.env.TOKEN_SECRET);
};