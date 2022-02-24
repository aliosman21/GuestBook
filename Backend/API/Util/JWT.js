const jwt = require("jsonwebtoken");
const _ = require("lodash");

module.exports.getJwtToken = ({id, email}) => {
   return jwt.sign({ id,email }, process.env.TOKEN_SECRET);
};

module.exports.getPropertiesFromToken = (authorizationHeader, ...fields) => {
   const token = authorizationHeader.split(" ")[1];
   const data = jwt.verify(token, process.env.TOKEN_SECRET);
   return _.pick(data, [...fields]);
};