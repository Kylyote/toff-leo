const router = require("express").Router();
const { User } = require("../../models");
const withAuth = require("../../utils/auth");

// GET ALL USERS = for testing

router.get("/", async (req, res) => {
  try {
    const getAllUsers = await User.findAll();

    res.status(200).json(getAllUsers);
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
router.post("/logout", withAuth, async (req, res) => {
  req.session.destroy(() => {
    res.status(204).end();
  });
});

// Create Account
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
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
