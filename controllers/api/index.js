const router = require("express").Router();
const users = require("./user-routes");

router.use("/users", users);

module.exports = router;
