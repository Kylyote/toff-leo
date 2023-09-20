const router = require("express").Router();
const apiRoutes = require("./api");

router.use("/api", apiRoutes); //extends routes into api folder.

// for rendering lobby on page load
router.get("/", async (req, res) => {
  //
  // will fetch all active games
  //

  // temp to render page
  res.render("lobby", {
    loggedIn: req.session.loggedIn, // if user is logged in passed into handlebar
  });
});

// renders log in form
router.get("/login", async (req, res) => {
  res.render("login");
});

// was throwing error without the Router() middleware being passed into server.js
module.exports = router;
