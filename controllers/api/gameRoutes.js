const router = require("express").Router();
const { Op } = require("sequelize");
const { Game, User } = require("../../models");

// get all games
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

// get all active games
router.get("/active", async (req, res) => {
  try {
    const getActiveGames = await Game.findAll({
      where: { game_status: { [Op.in]: ["active", "pending"] } },
      include: [
        { model: User, as: "Attacker" },
        { model: User, as: "Defender" },
      ], // will get all games that have a status of pending or active
    });

    const activeGames = await getActiveGames.map((game) =>
      game.get({ plain: true })
    );

    res.status(200).json(activeGames);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// get game by id
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

// create new game
router.post("/create", async (req, res) => {
  try {
    const createNewGame = await Game.create({
      attacker_id:
        req.body.chosenRole == "attacker" ? req.session.userId : null,
      defender_id:
        req.body.chosenRole == "defender" ? req.session.userId : null,
    });

    res.status(200).json(createNewGame);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
