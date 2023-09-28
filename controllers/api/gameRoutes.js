const router = require("express").Router();
const { Op } = require("sequelize");
const { Game, User, Chat } = require("../../models");
const { withAuth, redirectToWatch } = require("../../utils/auth");

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
        { model: Chat },
      ],
    });

    res.status(200).json(getGameById);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

const taflNineByNine = {
  a: [ null, null, null,     0,      1,    2,  null, null, null],
  b: [ null, null, null, null,     3, null, null, null, null],
  c: [ null, null, null, null,   24, null, null, null, null],
  d: [     4, null, null, null,   25, null, null, null,     5],
  e: [     6,     7,   26,   27,   36,  28,   29,     8,     9],
  f: [   10, null, null, null,   30, null, null, null,    11],
  g: [ null, null, null, null,   31, null, null, null, null],
  h: [ null, null, null, null,   12, null, null, null, null],
  i: [ null, null, null,   13,   14,   15, null, null, null],
  };

  const taflElevenByEleven = {
    a: [null, null, null, 0, 1, 2, 3, 4, null, null, null],
    b: [null, null, null, null, null, 5, null, null, null, null, null],
    c: [null, null, null, null, null, null, null, null, null, null, null],
    d: [6, null, null, null, null, 24, null, null, null, null, 7],
    e: [8, null, null, null, 25, 26, 27, null, null, null, 9],
    f: [10, 11, null, 28, 29, 36, 30, 31, null, 12, 13],
    g: [14, null, null, null, 32, 33, 34, null, null, null, 15],
    h: [16, null, null, null, null, 35, null, null, null, null, 17],
    i: [null, null, null, null, null, null, null, null, null, null, null],
    j: [null, null, null, null, null, 18, null, null, null, null, null],
    k: [null, null, null, 19, 20, 21, 22, 23, null, null, null],
  };
  


// create new game
router.post("/create", async (req, res) => {
  try {
    const createNewGame = await Game.create({
      attacker_id:
        req.body.chosenRole == "attacker" ? req.session.userId : null,
      defender_id:
        req.body.chosenRole == "defender" ? req.session.userId : null,
      board_state:
        req.body.chosenBoard == "taflNineByNine" ? taflNineByNine : taflElevenByEleven,
      is_nine_by_nine:
        req.body.chosenBoard == "taflNineByNine" ? true : false,
    });

    res.status(200).json(createNewGame);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// join a game by id
router.put("/join/:role/:gameId", async (req, res) => {
  try {
    const getThisGame = await Game.findByPk(req.params.gameId);

    await Game.update(
      {
        attacker_id:
          req.params.role == "attacker"
            ? req.session.userId
            : getThisGame.attacker_id,
        defender_id:
          req.params.role == "defender"
            ? req.session.userId
            : getThisGame.defender_id,
        game_status: "active",
      },
      {
        where: {
          id: req.params.gameId,
        },
      }
    );

    const updatedGame = await Game.findByPk(req.params.gameId);

    res.status(200).json(updatedGame);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});


router.get("/my-games", async (req, res) => {
  try {
    const getMyGames = await Game.findAll({
      where: {
        [Op.and]: [
          { game_status: { [Op.in]: ["active", "pending"] } },
          { attacker_id: req.session.userId },
          { defender_id: req.session.userId },
        ],
      },
      include: [
        { model: User, as: "Attacker" },
        { model: User, as: "Defender" },
      ],
    });

    const myGames = await getMyGames.map((game) => game.get({ plain: true }));

    res.status(200).json(myGames);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// mygames and id when the user is logged in
router.get("/play/:id", redirectToWatch, withAuth, async (req, res) => {
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

    const getThisGameByID = await Game.findByPk(req.params.id, {
      include: [
        { model: User, as: "Attacker" },
        { model: User, as: "Defender" },
      ],
    });

    console.log(`these are the games ${games}`);

    const thisGame = getThisGameByID.get({ plain: true });

    res.render("my-games", { games, thisGame, loggedIn: req.session.loggedIn });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//gets the game when the user is not logged in

router.get("/watch/:id", async (req, res) => {
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

    const getGameById = await Game.findByPk(req.params.id, {
      include: [
        { model: User, as: "Attacker" },
        { model: User, as: "Defender" },
      ],
    });

    const thisGame = await getGameById.get({ plain: true });

    res.render("lobby", { games, thisGame, loggedIn: req.session.loggedIn });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.put("/turn/:id", async (req, res) => {
  try {
    const updateTurn = await Game.update(
      {
        board_state: req.body.board,
        attacker_turn: req.body.turn,
        num_of_moves: req.body.numOfMoves,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    const getThisUpdatedGame = await Game.findByPk(req.params.id);

    res.status(200).json(getThisUpdatedGame);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.put("/gameover/:id", async (req, res) => {
  try {
    const gameIsOver = await Game.update(
      {
        game_status: req.body.gameStatus,
        winner_id: req.body.winner_id,
        gameover: true
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    
    const thisGameIsOver = await Game.findByPk(req.params.id);
    console.log("i think the update was successful");
    res.status(200).json(thisGameIsOver);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
