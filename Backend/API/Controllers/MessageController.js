const router = require("express").Router();
const middleWares = require("../Middlewares/middleware");
const messageService = require("../Services/MessageService");
const messagesSchema = require("../Schemas/MessageSchemas");
const repliesSchema = require("../Schemas/ReplySchemas");
const webTokenUtil = require("../Util/JWT");
const _ = require("lodash");


router.get(
   "/:userId",
   middleWares.checkToken(),
   middleWares.validateQuerySchema(messagesSchema.messagesFindSchema),
   async (req, res) => {
      const data = await messageService.getMessages(req.query, req.params.userId);
      return !_.isEmpty(data)
         ? res.status(200).send({ data, Message: "Messages found" })
         : res.status(400).send({ Message: "Failed to retrieve messages" });
   }
);

router.post(
   "/:userId",
   middleWares.checkToken(),
   middleWares.validateBodySchema(messagesSchema.messagesCreateSchema),
   async (req, res) => {
    const userData = webTokenUtil.getPropertiesFromToken(req.headers.authorization, "id");
    return (await messageService.addMessage(userData.id, { ...req.body, userId: req.params.userId }))
       ? res.status(200).send({ Message: "Message added successfully" })
       : res.status(400).send({ Message: "Failed to add message" });
   }
);
router.put(
   "/:messageId",
   middleWares.checkToken(),
   middleWares.validateBodySchema(messagesSchema.messagesEditSchema),
   async (req, res) => {
      const userData = webTokenUtil.getPropertiesFromToken(req.headers.authorization, "id");
      return (await messageService.editMessage(userData.id, { ...req.body, messageId: req.params.messageId }))
         ? res.status(200).send({ Message: "Message edited successfully" })
         : res.status(400).send({ Message: "Failed to edit message" });
   }
);
router.delete("/:messageId", middleWares.checkToken(), async (req, res) => {
   const userData = webTokenUtil.getPropertiesFromToken(req.headers.authorization, "id");
   return (await messageService.removeMessage(userData.id, req.params.messageId))
      ? res.status(200).send({ Message: "Message Deleted successfully" })
      : res.status(400).send({ Message: "Failed to delete message" });
});


router.get(
   "/:messageId/reply",
   middleWares.checkToken(),
   middleWares.validateQuerySchema(repliesSchema.repliesFindSchema),
   async (req, res) => {
      const data = await messageService.getReplies(req.query, req.params.messageId);
      return !_.isEmpty(data)
         ? res.status(200).send({ data, Message: "Replies found" })
         : res.status(400).send({ Message: "Failed to retrieve replies" });
   }
);
module.exports = router;