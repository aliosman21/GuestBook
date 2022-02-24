const router = require("express").Router();
const middleWares = require("../Middlewares/middleware");
const userSchemas = require("../Schemas/UserSchemas");
const userService = require("../Services/UserService");
const webTokenUtil = require("../Util/JWT");
const _ = require("lodash");

router.get(
   "/",
   middleWares.checkToken(),
   middleWares.validateQuerySchema(userSchemas.usersFindSchema),
   async (req, res) => {
      const userData = webTokenUtil.getPropertiesFromToken(req.headers.authorization, "id");
      const data = await userService.getUsers(userData.id, req.query);
      return !_.isEmpty(data)
         ? res.status(200).send({ data, Message: "Users found" })
         : res.status(400).send({ Message: "Failed to retrieve users" });
   }
);

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
