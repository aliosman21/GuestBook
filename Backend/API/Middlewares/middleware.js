

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