const router = require("express").Router();
const { Game, User, Role, UserGameRole } = require("../../models");

router.get("/", async (req, res) => {
  try {
    const getAllGames = await Game.findAll({
      include: [{ model: User }], // this should be getting the users associated with the game throught the attacker_id and defender_id.  Need to look at the model
    });

    res.status(200).json(getAllGames);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
