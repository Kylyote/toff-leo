const router = require("express").Router();
const { Game, User, Role, UserGameRole } = require("../../models");

router.get("/", async (req, res) => {
  try {
    const getAllGames = await Game.findAll({
      include: [
        { model: User, as: "Attacker" },
        { model: User, as: "Defender" },
      ],
    });

    res.status(200).json(getAllGames);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const getGameById = await Game.findByPk(req.params.id, {
      include: [
        { model: User, as: "Attacker" },
        { model: User, as: "Defender" },
      ],
    });

    res.status(200).json(getGameById);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
