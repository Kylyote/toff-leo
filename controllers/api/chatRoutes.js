const { Chat } = require("../../models");

const router = require("express").Router();

router.get("/:id", async (req, res) => {
  try {
    const getChatByGameId = await Chat.findAll({
      where: { game_id: req.params.id },
    });

    const thisChat = await getChatByGameId.map((game) =>
      game.get({ plain: true })
    );

    res.status(200).json(thisChat);
  } catch (error) {
    console.log(error);
    res.status(500), json(error);
  }
});

module.exports = router;
