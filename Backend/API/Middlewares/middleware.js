const jwt = require("jsonwebtoken");

module.exports.checkToken = () => {
   return async (req, res, next) => {
      try {
         if (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {
            const VerifiedToken = jwt.verify(
               req.headers.authorization.split(" ")[1],
               process.env.TOKEN_SECRET
            );
            next();
         } else {
            res.status(401).send("Access denied no TOKEN found");
         }
      } catch (error) {
         res.status(401).send("Wrong Token");
      }
   };
};

module.exports.validateBodySchema = (schema) => {
   return async (req, res, next) => {
      try {
         const { error } = schema.validate(req.body);
         // Status 406 is a not acceptable input
         if(error)
            res.status(406).send({ Message: "Invalid input detected" });
         else
            next();
        // Server error caught
      } catch (error) {
         res.status(500).send({ Message: "An internal server error occurred"});
      }
   };
}
module.exports.validateQuerySchema = (schema) => {
   return async (req, res, next) => {
      try {
         const { error } = schema.validate(req.query);
         // Status 406 is a not acceptable input
         if(error)
            res.status(406).send({ Message: "Invalid input detected" });
         else
            next();
        // Server error caught
      } catch (error) {
         res.status(500).send({ Message: "An internal server error occurred"});
      }
   };
}