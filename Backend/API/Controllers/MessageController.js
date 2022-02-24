const router = require("express").Router();
const middleWares = require("../Middlewares/middleware");
const messageService = require("../Services/MessageService");
const messagesSchema = require("../Schemas/MessageSchemas");
const webTokenUtil = require("../Util/JWT");
const _ = require("lodash");

/**
 * Find all messages for a user
 */
router.get(
   "/",
   middleWares.checkToken(),
   middleWares.validateQuerySchema(messagesSchema.messagesFindSchema),
   async (req, res) => {
      const data = await messageService.getMessages(req.query);
         return !_.isEmpty(data)
            ? res.status(200).send({ data, Message: "Messages found" })
            : res.status(400).send({ Message: "Failed to retrieve messages" });
   }
);

router.post(
   "/",
   middleWares.checkToken(),
   middleWares.validateBodySchema(messagesSchema.messagesCreateSchema),
   async (req, res) => {
    const userData = webTokenUtil.getPropertiesFromToken(req.headers.authorization, "id");
    return await messageService.addMessage(userData.id, req.body)
       ? res.status(200).send({ Message: "Message added successfully" })
       : res.status(400).send({ Message: "Failed to add message" });
   }
);
module.exports = router;