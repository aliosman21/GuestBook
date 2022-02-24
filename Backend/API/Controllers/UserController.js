const router = require("express").Router();
const middleWares = require("../Middlewares/middleware");
const userSchemas = require("../Schemas/UserSchemas");
const userService = require("../Services/UserService");
const webTokenUtil = require("../Util/JWT");
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
      return res.status(409).send({ Message: "Conflict in user email" });

   return (await userService.createUser(req.body))
      ? res.status(200).send({ Message: "User created successfully" })
      : res.status(500).send({ Message: "Server error" });
});

router.post(
   "/login",
   middleWares.validateBodySchema(userSchemas.userLoginSchema),
   async (req, res) => {
      const user = await userService.getUserByEmail(req.body);
      if (!user) return res.status(404).send({ Message: "User not found" });

      if (await userService.login(req.body, user)){
        const token = webTokenUtil.getJwtToken(user);
        return res.status(200).send({ token, Message: "Verified successfully" })
      }
        return res.status(500).send({ Message: "Server error" });
   }
);

module.exports = router;
