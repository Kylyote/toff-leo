const router = require("express").Router();
const { Op } = require("sequelize");
const apiRoutes = require("./api");
const { Game, User } = require("../models");
const { withAuth } = require("../utils/auth");

router.use("/api", apiRoutes); //extends routes into api folder.

// for rendering lobby on page load
router.get("/", async (req, res) => {
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

    const games = await getActiveGames.map((game) => game.get({ plain: true }));

    res.render("lobby", {
      games,
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

// renders my-games
router.get("/my-games", withAuth, async (req, res) => {
  try {
    const getMyGames = await Game.findAll({
      where: {
        [Op.or]: [
          { attacker_id: req.session.userId },
          { defender_id: req.session.userId },
        ],
      },
      include: [
        { model: User, as: "Attacker" },
        { model: User, as: "Defender" },
      ],
    });

    const games = await getMyGames.map((game) => game.get({ plain: true }));

    res.render("my-games", { games, loggedIn: req.session.loggedIn });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.get("/my-games/:id", async (req, res) => {
  try {
    const getMyGames = await Game.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        { model: User, as: "Attacker" },
        { model: User, as: "Defender" },
      ],
    });

    const game = await getMyGames.get({ plain: true });

    res.render("game", { game, loggedIn: req.session.loggedIn });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// Renders stat page
router.get('/my-stats', withAuth, async(req, res) => {
  try {
    const getMyStats = await User.findByPk()
  } catch (err) {
    
  }
})
// was throwing error without the Router() middleware being passed into server.js
module.exports = router;
