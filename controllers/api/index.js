const router = require("express").Router();
const users = require("./userRoutes");
const games = require("./gameRoutes");

router.use("/users", users);
router.use("/games", games);

module.exports = router;
