const router = require("express").Router();
const middleWares = require("../Middlewares/middleware");
const userSchemas = require("../Schemas/UserSchemas");
const userService = require("../Services/UserService");
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
    if (await userService.getUserByEmail(req.body))
       return res.status(409).send({ Message: "Conflict in user email" })


       return await userService.createUser(req.body)
           ? res.status(200).send({ Message: "User created successfully" })
           : res.status(500).send({ Message: "Server error" });
});

module.exports = router;