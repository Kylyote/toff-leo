const { Chat } = require("../../models");

const router = require("express").Router();

// get chat by game id (for Testing)
router.get("/:id", async (req, res) => {
  try {
    const getChatByGameId = await Chat.findAll({
      where: { game_id: req.params.id },
    });

    const thisChat = await getChatByGameId.map((chat) =>
      chat.get({ plain: true })
    );

    res.status(200).json(thisChat);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const addMessage = await Chat.create({
      game_id: req.body.thisGameId,
      content: req.body.messageContent,
      sender_id: req.session.userId,
    });

    res.status(200).json(addMessage);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
