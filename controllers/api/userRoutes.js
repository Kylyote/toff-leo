const router = require("express").Router();
const { User, Game } = require("../../models");
const withAuth = require("../../utils/auth");
const sequelize = require("../../config/connection");
// GET ALL USERS = for testing

router.get("/", async (req, res) => {
  try {
    const getAllUsers = await User.findAll({
      include: [
        { model: Game, as: "Attacker" },
        { model: Game, as: "Defender" },
      ],
    });

    res.status(200).json(getAllUsers);
  } catch (error) {}
});



router.get("/username", async (req, res) => {
  try {
    const getThisUser = await User.findByPk(req.session.userId);
    res.status(200).json(getThisUser);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//get a user by id
router.get("/user/:id", async (req, res) => {
  try {
    const getUserById = await User.findByPk(req.params.id);
    res.status(200).json(getUserById);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//update a specific user
router.put("/update/:id", async (req, res) => {
  try {
    const updateUser = await User.update(
      {
        win: req.body.win,
        loss: req.body.loss,
        draw: req.body.draw,
        games_played: req.body.games,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    const getThisUpdatedGame = await User.findByPk(req.params.id);

    res.status(200).json(getThisUpdatedGame);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const getUser = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!getUser) {
      res
        .status(400)
        .json({ message: `Incorrect email or password. Please Try Again` });
      return;
    }

    const validatePassword = await getUser.checkPassword(req.body.password);

    if (!validatePassword) {
      console.log("error 1");
      res
        .status(400)
        .json({ message: `Incorrect email or password. Please Try Again` });
      return;
    }

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.userId = getUser.id; // stores users id in the session so we can gather which games they are involved with
      res.status(200).json({ message: "You are now logged in" });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// LOG OUT
router.post("/logout", async (req, res) => {
  req.session.destroy(() => {
    res.status(204).end();
  });
});

// CREATE USER
router.post("/", async (req, res) => {
  try {
    // creates new user
    const createNewUser = await User.create({
      username: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    const getThisUser = await User.findOne({
      where: { email: req.body.email },
    });

    req.session.save(() => {
      req.session.loggedIn = true; // sets session to logged in
      req.session.userId = getThisUser.id; // sets users id for getting their games
      res.status(200).json("you have signed up and are logged in");
    });
  } catch (error) { 
    let errorMessage = error.errors[0].message;
    console.log(errorMessage)
    res.status(400).json(`${errorMessage}`);

  }
});

// Get my session id
router.get("/my-id", async (req, res) => {
  try {
    const myId = req.session.userId;

    res.status(200).json(myId);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.get("/logged-in", async (req, res) => {
  try {
    const loggedIn = (await req.session.loggedIn) ? true : false;

    res.status(200).json(loggedIn);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;