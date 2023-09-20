const router = require("express").Router();
const { Op } = require("sequelize");
const apiRoutes = require("./api");
const { Game, User } = require("../models");

router.use("/api", apiRoutes); //extends routes into api folder.

// for rendering lobby on page load
router.get("/", async (req, res) => {
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

    res.render("lobby", {
      activeGames,
      loggedIn: req.session.loggedIn, // if user is logged in passed into handlebar
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }

  // temp to render page
});

// renders log in form
router.get("/login", async (req, res) => {
  res.render("login");
});

// was throwing error without the Router() middleware being passed into server.js
module.exports = router;
