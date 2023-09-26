const router = require("express").Router();
const users = require("./userRoutes");
const games = require("./gameRoutes");
const chats = require("./chatRoutes");

router.use("/users", users);
router.use("/games", games);
router.use("/chats", chats);

module.exports = router;
