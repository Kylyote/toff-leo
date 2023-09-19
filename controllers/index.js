const router = require("express").Router();

router.get("/", async (req, res) => {
  //
  // will fetch all active games
  //

  // temp to render page
  res.render("lobby", {
    loggedIn: req.session.loggedIn, // if user is logged in passed into handlebar
  });
});
// was throwing error without the Router() middleware being passed into server.js
module.exports = router;
