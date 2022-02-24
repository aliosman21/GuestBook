const router = require("express").Router();
const middleWares = require("../Middlewares/middleware");
const userSchemas = require("../Schemas/UserSchemas");
/**
 * Gets a list of all users
 */
router.get("/", async (req, res) => {
    res.status(200).send({ Message: "List" });
});

/**
 * Create a new user
 */
router.post("/", middleWares.validateBodySchema(userSchemas.userCreateSchema), async (req, res) => {
   res.status(200).send({ Message: "List" });
});

module.exports = router;