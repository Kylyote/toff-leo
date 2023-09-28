const router = require("express").Router();
const users = require("./userRoutes");
const games = require("./gameRoutes");
const chats = require("./chatRoutes");
const stats = require("./statRoutes");

router.use("/users", users);
router.use("/games", games);
router.use("/chats", chats);
router.use("/stats", stats);


module.exports = router;
