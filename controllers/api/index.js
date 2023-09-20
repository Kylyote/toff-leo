const router = require("express").Router();
const users = require("./user-routes");
const games = require("./game-routes");

router.use("/users", users);
router.use("/games", games);

module.exports = router;
