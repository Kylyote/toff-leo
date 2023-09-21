const router = require("express").Router();
const { Op } = require("sequelize");
const apiRoutes = require("./api");
const { Game, User } = require("../models");

router.use("/api", apiRoutes); //extends routes into api folder.

// for rendering lobby on page load
router.get("/", async (req, res) => {
  console.log(req.session.loggedIn);

  // isLoggedIn sets the filter criteria for the lobby.  If the user is not logged in then only active games will show because they are only able to observe active games.  If they are logged in they can see active games and also games that are looking waiting on an opponent
  const isLoggedIn = req.session.loggedIn ? ["active", "pending"] : ["active"];

  try {
    const getActiveGames = await Game.findAll({
      where: { game_status: { [Op.in]: isLoggedIn } },
      include: [
        { model: User, as: "Attacker" },
        { model: User, as: "Defender" },
      ], // will get all games that have a status of pending or active
    });

    const activeGames = await getActiveGames.map((game) =>
      game.get({ plain: true })
    );

    console.log(activeGames);
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
